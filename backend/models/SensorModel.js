// models/SensorModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Sensors = db.define("Sensors", {
  type: {
    type: DataTypes.ENUM("temperature", "airQuality"),
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  businessUnit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subUnit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // ✅ Tambahan Alert
  alertStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  alertMessage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sensorCode: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false // Optional, bisa dibuat wajib juga
  },
  sensorName: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // ✅ Tambahan IP Address
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true // atau false jika wajib
  }

}, {
  freezeTableName: true
});

export default Sensors;
