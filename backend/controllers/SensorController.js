import Sensors from "../models/SensorModel.js";
import SensorLog from "../models/SensorLogModel.js";
import { checkAndCreateAlert } from "../services/alertService.js";
import { bufferSensorData } from "../services/bufferService.js";
import { io } from "../index.js";




const checkAlertCondition = (type, value) => {
  if (type === 'temperature' && (value < 10 || value > 40)) {
    return { alertStatus: true, alertMessage: "Suhu abnormal!" };
  }
  if (type === 'airQuality' && value > 150) {
    return { alertStatus: true, alertMessage: "Kualitas udara buruk!" };
  }
  return { alertStatus: false, alertMessage: null };
};

// POST /sensors (admin bisa input data)
export const createSensorData = async (req, res) => { 
  const {
    type, value, location,
    businessUnit, subUnit, branch,
    sensorCode, sensorName
  } = req.body;

  try {
    const ipAddress = req.ip || req.connection.remoteAddress;

    const { alertStatus, alertMessage } = checkAndCreateAlert({ type, value });

    const sensorData = {
      type,
      value,
      location,
      businessUnit,
      subUnit,
      branch,
      sensorCode,
      sensorName,
      alertStatus,
      alertMessage,
      ipAddress
    };

    // 1. Simpan data utama
    const newSensor = await Sensors.create(sensorData);

    // 2. Simpan ke log historis
    await SensorLog.create({
      type,
      sensorId: newSensor.id,
      value,
      alertStatus,
      alertMessage,
      ipAddress
    });

    // 3. (opsional) Buffer lokal
    bufferSensorData(sensorData);

    // ✅ 4. Kirim data ke client (real-time)
    if (io) {
      io.emit("sensorUpdate", {
        id: newSensor.id,
        ...sensorData,
        timestamp: newSensor.timestamp,
      });
    }

    res.status(201).json({
      msg: "Sensor data saved and logged",
      alertStatus,
      alertMessage
    });

  } catch (error) {
    console.error("Create Sensor Error:", error);
    res.status(500).json({ msg: error.message });
  }
};

// GET /sensors (filtered by user access)
export const getAllSensors = async (req, res) => {
  try {
    console.log("🔍 Scope di dashboard:", req.scope);
    const where = req.scope || {};

    const sensors = await Sensors.findAll({
      where,
      attributes: [
        "id",
        "type",
        "value",
        "location",
        "timestamp",
        "alertStatus",
        "alertMessage",
        "sensorCode",
        "sensorName",
        "branch",
        "ipAddress" // ✅ tambahkan field ini
      ]
    });

    res.json(sensors);
  } catch (error) {
    console.error("🔥 Error in getAllSensors:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};


// GET /sensors/:id/logs
export const getSensorLogsById = async (req, res) => {
  const sensorId = req.params.id;

  try {
    const sensor = await Sensors.findByPk(sensorId);
    if (!sensor) {
      return res.status(404).json({ msg: "Sensor not found" });
    }

    const logs = await SensorLog.findAll({
      where: { sensorId },
      order: [["timestamp", "DESC"]],
      attributes: ["value", "timestamp", "alertStatus", "alertMessage", "ipAddress"]
    });

    res.status(200).json({
      sensor: {
        id: sensor.id,
        type: sensor.type,
        location: sensor.location,
        branch: sensor.branch,
        sensorCode: sensor.sensorCode,
        sensorName: sensor.sensorName
      },
      logs
    });

  } catch (error) {
    console.error("Get Sensor Logs Error:", error);
    res.status(500).json({ msg: error.message });
  }
};


export const ingestSensorData = async (req, res) => {
  try {
    const { branchId, type, location, value } = req.body;

    if (!["temperature", "airQuality"].includes(type)) {
      return res.status(400).json({ msg: "Invalid sensor type" });
    }

    const sensorValue = parseFloat(value); // pastikan dalam float
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Cek apakah sensor sudah ada
    let sensor = await Sensors.findOne({
      where: { type, location, branch: branchId }
    });

    // === Jika sensor BELUM ada, BUAT BARU ===
    if (!sensor) {
      const { alertStatus, alertMessage } = checkAndCreateAlert({ type, value: sensorValue });

      sensor = await Sensors.create({
        type,
        value: sensorValue,
        location,
        businessUnit: "",
        subUnit: "",
        branch: branchId,
        sensorCode: "",
        sensorName: "",
        alertStatus,
        alertMessage,
        ipAddress // ✅ simpan IP sumber data
      });

      await SensorLog.create({
        type,
        sensorId: sensor.id,
        value: sensorValue,
        alertStatus,
        alertMessage,
        ipAddress // ✅ juga simpan IP di log
      });

      return res.status(201).json({
        msg: "Sensor created and first log saved",
        value: sensorValue,
        alertStatus,
        alertMessage
      });
    }

    // === Sensor SUDAH ADA, cek apakah value berubah ===
    const latestLog = await SensorLog.findOne({
      where: { sensorId: sensor.id },
      order: [["timestamp", "DESC"]]
    });

    if (latestLog && latestLog.value === sensorValue) {
      return res.status(200).json({
        msg: "Value unchanged, no log saved",
        value: sensorValue
      });
    }

    // === Value BERUBAH -> Buat log baru ===
    const { alertStatus, alertMessage } = checkAndCreateAlert({ type, value: sensorValue });

    await SensorLog.create({
      type,
      sensorId: sensor.id,
      value: sensorValue,
      alertStatus,
      alertMessage,
      ipAddress // ✅ log IP perubahan
    });

    // Update nilai di tabel utama
    await sensor.update({
      value: sensorValue,
      alertStatus,
      alertMessage,
      ipAddress // ✅ update IP terakhir
    });

    res.status(201).json({
      msg: "Sensor value changed, new log saved",
      value: sensorValue,
      alertStatus,
      alertMessage
    });

  } catch (error) {
    console.error("Ingest Error:", error);
    res.status(500).json({ msg: error.message });
  }
};


export const getSensorSummary = async (req, res) => {
  try {
    const total = await Sensors.count();

    const businessUnits = await Sensors.aggregate('businessUnit', 'count', { distinct: true });
    const subUnits = await Sensors.aggregate('subUnit', 'count', { distinct: true });
    const branches = await Sensors.aggregate('branch', 'count', { distinct: true });

    res.status(200).json({
      total,
      totalBusinessUnit: businessUnits,
      totalSubUnit: subUnits,
      totalBranch: branches
    });
  } catch (error) {
    console.error("Error getting sensor summary:", error);
    res.status(500).json({ msg: "Gagal mengambil ringkasan sensor", error: error.message });
  }
};


export const updateSensorData = async (req, res) => {
  const { sensorCode } = req.params;
  const newData = req.body;

  try {
    const sensor = await Sensors.findOne({ where: { sensorCode } });

    if (!sensor) {
      return res.status(404).json({ msg: "Sensor tidak ditemukan" });
    }

    await sensor.update(newData);

    // ✅ Emit ke semua client yang terkoneksi
    io.emit("temperatureUpdate", {
      sensorCode: sensor.sensorCode,
      sensorName: sensor.sensorName,
      value: sensor.value,
      location: sensor.location
    });
    console.log("📢 Emit to frontend:", sensor.sensorCode, sensor.value);

    res.status(200).json({ msg: "Sensor berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};