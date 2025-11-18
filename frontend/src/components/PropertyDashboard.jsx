
// src/components/LiveTemperature.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true
});

function PropertyDashboard() {
  const [temperature, setTemperature] = useState(null);
  const [sensorInfo, setSensorInfo] = useState({});

  useEffect(() => {
    socket.on("temperatureUpdate", (data) => {
      setTemperature(data.value);
      setSensorInfo(data);
      console.log("📡 Sensor data received:", data);
    });

    return () => {
      socket.off("temperatureUpdate");
    };
  }, []);

  return (
    <section className='section'>
        <div className="container">
            <div className="box">
      <h1 className="title is-4">🌡️ Real-time Temperature</h1>
      {temperature ? (
        <div>
          <p><strong>Sensor:</strong> {sensorInfo.sensorName} ({sensorInfo.sensorCode})</p>
          <p><strong>Location:</strong> {sensorInfo.location}</p>
          <p><strong>Value:</strong> <span className="has-text-danger">{temperature}°C</span></p>
          <p><strong>Status:</strong> {sensorInfo.alertStatus} ({sensorInfo.alertMessage})</p>
        </div>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
        </div>
    </section>
  )
}

export default PropertyDashboard
