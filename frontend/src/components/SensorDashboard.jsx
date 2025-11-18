// src/components/SensorDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import SensorCard from "./SensorCard";

const SensorDashboard = () => {
  const [sensors, setSensors] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserAndSensors = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/me", {
          withCredentials: true,
        });
        setUserRole(userRes.data.role);

        const sensorRes = await axios.get("http://localhost:5000/dashboard", {
          withCredentials: true,
        });
        setSensors(sensorRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUserAndSensors();
  }, []);

  return (
    <section className="section sensor-dashboard-section">
      <div className="container is-fluid px-0">
        <div className="columns is-multiline is-variable is-4">
          {Array.isArray(sensors) && sensors.length > 0 ? (
            sensors.map((sensor, index) => (
              <SensorCard
                key={index}
                sensor={sensor}
                userRole={userRole}
              />
            ))
          ) : (
            <div className="column is-12 has-text-centered">
              <p>No sensor data available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SensorDashboard;
