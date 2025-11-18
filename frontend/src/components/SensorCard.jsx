// src/components/SensorCard.jsx

import React, { useEffect, useState, useRef } from "react";
import {
  FaTemperatureHigh,
  FaSmog,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { io } from "socket.io-client";

const SensorCard = ({ sensor: initialSensor, userRole }) => {
  const [sensorData, setSensorData] = useState(initialSensor);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
    });

    socketRef.current.on("temperatureUpdate", (data) => {
      if (data.sensorCode === sensorData.sensorCode) {
        setSensorData((prev) => ({ ...prev, ...data }));
        console.log("🔄 Sensor updated:", data);
      }
    });

    socketRef.current.on("airQualityUpdate", (data) => {
      if (data.sensorCode === sensorData.sensorCode) {
        setSensorData((prev) => ({ ...prev, ...data }));
        console.log("🔄 Air quality updated:", data);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [sensorData.sensorCode]);

  if (!sensorData || !sensorData.type) return null;

  const {
    type,
    value,
    location,
    timestamp,
    alertStatus,
    alertMessage,
    sensorName,
    sensorCode,
    ipAddress,
  } = sensorData;

  const icon = type === "temperature" ? <FaTemperatureHigh /> : <FaSmog />;
  const cardColor = alertStatus ? "is-danger" : "is-success";
  const alertIcon = alertStatus ? <FaExclamationTriangle /> : <FaCheckCircle />;



  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen">
      <div className={`card ${cardColor}`}>
        <header className="card-header">
          <p className="card-header-title">
            {icon}&nbsp; {sensorName || "Sensor"} ({type.toUpperCase()})
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <p><strong>Code:</strong> {sensorCode || "-"}</p>
            <p><strong>Value:</strong> {value}</p>
            <p><strong>Location:</strong> {location}</p>
            <p><strong>Times:</strong> {new Date(timestamp).toLocaleString()}</p>
            <p>
              <strong>Status:</strong> {alertIcon}&nbsp;
              {alertStatus ? alertMessage || "Alert Triggered!" : "Normal"}
            </p>
            {userRole === "administrator" && (
              <p><strong>IP Address:</strong> {ipAddress || "-"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
