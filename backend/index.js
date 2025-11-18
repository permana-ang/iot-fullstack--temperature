import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import connectSessionSequelize from "connect-session-sequelize";
import { createServer } from "http";
import { Server } from "socket.io";

// Inisialisasi dotenv
dotenv.config();

// Inisialisasi express dan http server
const app = express();
const httpServer = createServer(app);

// Setup socket.io
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://172.30.66.247:3000'],
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }
});

// ✅ Export io setelah didefinisikan
export { io };

// Setup store session
const SequelizeStore = connectSessionSequelize(session.Store);
const store = new SequelizeStore({ db });

// Middleware session
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: 'auto'
  }
}));

// Middleware umum untuk API kita yang kita ijinkan mengakses server
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://172.30.66.247:3000']
}));
app.use(express.json());

// Routes
import AuthRoute from "./routes/AuthRoute.js";
import SensorRoute from "./routes/SensorRoute.js";

app.use(AuthRoute);
app.use(SensorRoute);

// WebSocket koneksi dasar
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Jalankan server HTTP
httpServer.listen(process.env.APP_PORT, '0.0.0.0', () => {
  console.log('🚀 Server + WebSocket running on port ' + process.env.APP_PORT);
});
