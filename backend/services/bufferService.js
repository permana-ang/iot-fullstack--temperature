// services/bufferService.js

import Sensors from "../models/SensorModel.js";

let sensorBuffer = [];

// Fungsi untuk buffer (dipanggil setiap input data sensor)
export const bufferSensorData = (sensorData) => {
  sensorBuffer.push(sensorData);
};

// Fungsi untuk menyimpan data buffer ke DB (bisa dijalankan periodik)
export const flushSensorData = async () => {
  if (sensorBuffer.length === 0) return;

  try {
    await Sensors.bulkCreate(sensorBuffer);
    console.log(`✅ ${sensorBuffer.length} data sensor berhasil disimpan ke DB`);
    sensorBuffer = [];
  } catch (error) {
    console.error("❌ Gagal menyimpan data buffer:", error.message);
  }
};
