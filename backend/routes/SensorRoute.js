import express from 'express';
import { 
  createSensorData,
  getAllSensors,
  ingestSensorData,
  getSensorLogsById,
  getSensorSummary,
  updateSensorData
} from '../controllers/SensorController.js';
import { verifyUser, authorizeAccess  } from '../middleware/AuthMiddleware.js';

const router = express.Router();


router.get('/dashboard', getAllSensors); // get data sensor sesuai akses user
router.get('/sensors/:id', verifyUser);
router.post('/sensors', verifyUser, authorizeAccess(["adminBranch", "adminSU", "adminBU", "administrator"]), createSensorData);
router.put("/sensors/:sensorCode", updateSensorData); // ✅ route update sensor


router.post('/ingest', verifyUser, ingestSensorData); // untuk menerima data dari IoT

router.get("/sensors/:id/logs", verifyUser, getSensorLogsById);


// router.get("/sensors/total", verifyUser, getTotalSensorCounts);
router.get("/sensors/summary", verifyUser, getSensorSummary);


export default router;
