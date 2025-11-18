import express from 'express';
import { login, logout, sessionStatus, registerUser, createUser, Me, getUsers, deleteUser  } from '../controllers/AuthController.js';
import { verifyUser, verifyUsers, adminOnly, authorizeAccess, authorizeRoles } from '../middleware/AuthMiddleware.js';


const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);
router.get('/session', sessionStatus);
router.post("/register", registerUser);


router.post("/users", verifyUsers, createUser);

// ini sudah benar
// router.get('/users', verifyUsers, adminOnly, getUsers);

router.get("/me", verifyUsers, Me);

// Untuk semua admin: adminBranch ke atas
router.get("/users", verifyUsers, authorizeAccess(["adminBranch"]), getUsers);

// // Untuk adminSU ke atas
router.post("/users/create",verifyUsers, authorizeAccess(["adminSU"]), createUser);


// Untuk adminBU ke atas
router.delete("/users/:id", verifyUsers, authorizeAccess(["adminBU"]), deleteUser);

// // Untuk hanya administrator
// router.get("/settings", verifyUsers, authorizeAccess(["administrator"]), systemSettings);


router.delete("/users/:id", verifyUsers, deleteUser);



export default router;
