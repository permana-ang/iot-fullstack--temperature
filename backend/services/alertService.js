// services/alertService.js

export const checkAndCreateAlert = ({ type, value }) => {
  let alertStatus = false;
  let alertMessage = "";

  if (type === "temperature" && value > 40) {
    alertStatus = true;
    alertMessage = `⚠️ Suhu tinggi terdeteksi: ${value}°C`;
  }

  if (type === "airQuality" && value > 300) {
    alertStatus = true;
    alertMessage = `⚠️ Kualitas udara buruk: AQI ${value}`;
  }

  return { alertStatus, alertMessage };
};
