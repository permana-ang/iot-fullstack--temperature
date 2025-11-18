// Setiap kali ada data sensor masuk, kita simpan log-nya di tabel SensorLog untuk histori.


// models/SensorLogModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Sensors from "./SensorModel.js";

const { DataTypes } = Sequelize;

const SensorLog = db.define("SensorLog", {
  type: {
  type: DataTypes.ENUM("temperature", "airQuality"),
  allowNull: false
  },
  sensorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  alertStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  alertMessage: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // ✅ Tambahan ipAddress
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true // Bisa dibuat false kalau wajib
  }


}, {
  freezeTableName: true,
  indexes: [
    {
      fields: ['sensorId']
    },
    {
      fields: ['timestamp']
    }
  ]
});

// Relasi ke sensor utama
Sensors.hasMany(SensorLog, { foreignKey: "sensorId", onDelete: "CASCADE" });
SensorLog.belongsTo(Sensors, { foreignKey: "sensorId" });

export default SensorLog;
