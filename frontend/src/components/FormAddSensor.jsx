import React, { useState } from "react";
import axios from "axios";

const FormAddSensor = () => {
  const [formData, setFormData] = useState({
    type: "temperature",
    value: "",
    location: "",
    businessUnit: "",
    subUnit: "",
    branch: "",
    sensorCode: "",
    sensorName: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/sensors", formData, {
        withCredentials: true,
      });

      setMessage(response.data.msg || "Sensor added successfully.");
      setFormData({
        type: "temperature",
        value: "",
        location: "",
        businessUnit: "",
        subUnit: "",
        branch: "",
        sensorCode: "",
        sensorName: ""
      });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.msg || "Error adding sensor.");
    }
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Tambah Sensor</h1>

        {message && (
          <div className="notification is-info is-light">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Tipe Sensor</label>
            <div className="control">
              <div className="select">
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}>
                  <option value="temperature">Temperature</option>
                  <option value="airQuality">Air Quality</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Value</label>
            <div className="control">
              <input
                className="input"
                type="number"
                step="0.01"
                name="value"
                value={formData.value}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Business Unit</label>
            <div className="control">
              <select
                className="input"
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleChange}
                required
              >
                <option value="unit1">BU Cemindo</option>
                <option value="unit2">BU Plantation</option>
                <option value="unit3">BU EUP</option>
                <option value="unit4">BU Property</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Sub Unit</label>
            <div className="control">
              <select
                className="input"
                name="subUnit"
                value={formData.subUnit}
                onChange={handleChange}
                required
              >
                <option value="subunit1">Sub Unit Cemindo</option>
                <option value="subunit2">Sub Unit Plantation</option>
                <option value="subunit3">Sub Unit EUP</option>
                <option value="subunit4">Sub Unit Property</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Branch</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Sensor Code</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="sensorCode"
                value={formData.sensorCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Sensor Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="sensorName"
                value={formData.sensorName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field mt-5">
            <div className="control">
              <button className="button is-primary" type="submit">
                Simpan Sensor
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormAddSensor;
