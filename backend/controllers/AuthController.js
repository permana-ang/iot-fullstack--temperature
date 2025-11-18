import { Users, UserAccess } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import session from "express-session";

export const login = async (req, res) => {
  try {
    console.log("Login request:", req.body); // 🟡 log data masuk

    const { username, password } = req.body;

    const user = await Users.findOne({
    where: { username: req.body.username },
    include: {
    model: UserAccess,
    as: "access" // ✅ SESUAI DENGAN ALIAS DI DEFINISI MODEL
  }
});

    if (!user) {
      console.log("User tidak ditemukan");
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Password salah");
      return res.status(401).json({ msg: "Password salah" });
    }

    req.session.userId = user.id;
    res.json({ msg: "Login berhasil", user });

  } catch (error) {
    console.error("Login error:", error); // 🔴 log kesalahan backend
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const user = await Users.findOne({
      where: { id: req.session.userId },
      attributes: ["id", "username", "role"],
      include: {
        model: UserAccess,
        as: "access", // ✅ WAJIB karena di Users kamu pakai alias "access"
        attributes: ["businessUnit", "subUnit", "branch"]
      }
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};




export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Gagal logout" });
    res.clearCookie("connect.sid");
    res.json({ msg: "Logout berhasil" });
  });
};

export const sessionStatus = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ msg: "Belum login" });
  const user = await Users.findByPk(req.session.userId, { include: UserAccess });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  res.json({ user });
};

export const registerUser = async (req, res) => {
  const { username, password, role, access } = req.body;

  if (!username || !password || !role || !access) {
    return res.status(400).json({ msg: "Lengkapi semua field" });
  }

  const existing = await Users.findOne({ where: { username } });
  if (existing) {
    return res.status(409).json({ msg: "Username sudah digunakan" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await Users.create({ username, password: hashPassword, role });

    await UserAccess.create({
      userId: user.id,
      role,
      businessUnit: access.businessUnit || null,
      subUnit: access.subUnit || null,
      branch: access.branch || null
    });

    return res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    return res.status(500).json({ msg: "Gagal registrasi", error: error.message });
  }
};


export const createUser = async (req, res) => {
  const { username, password, role, access } = req.body;

  try {
    // Cek duplikasi username
    const existing = await Users.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ msg: "Username sudah digunakan!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user
    const newUser = await Users.create({
      username,
      password: hashedPassword,
      role,
    });

    // Simpan akses jika bukan administrator
    if (role !== "administrator") {
      await UserAccess.create({
        userId: newUser.id,
        username, // ⬅️ DIBUTUHKAN karena kolom ini `NOT NULL`
        role,
        businessUnit: access?.businessUnit || null,
        subUnit: access?.subUnit || null,
        branch: access?.branch || null,
      });
    }

    // Ambil ulang user untuk pastikan relasi access ikut
    const createdUser = await Users.findOne({
      where: { id: newUser.id },
      attributes: ["id", "username", "role"],
      include: {
        model: UserAccess,
        as: "access",
      },
    });

    res.status(201).json(createdUser);
  } catch (err) {
    console.error("Create User Error:", err);
    res.status(500).json({ msg: "Gagal membuat user." });
  }
};


export const getUsers = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userAccess = req.access;

    let whereClause = {};

    if (userRole !== "administrator") {
      if (userAccess.businessUnit) {
        whereClause.businessUnit = userAccess.businessUnit;
      }
      if (userAccess.subUnit) {
        whereClause.subUnit = userAccess.subUnit;
      }
      if (userAccess.branch) {
        whereClause.branch = userAccess.branch;
      }
    }

    const users = await Users.findAll({
      include: {
        model: UserAccess,
        as: "access", // WAJIB SAMA DENGAN ALIAS DI MODEL
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
      },
      attributes: ["id", "username", "role"],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("🔴 getUsers error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
};







export const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Hapus UserAccess jika ada
    await UserAccess.destroy({
      where: { userId: user.id }
    });

    // Hapus user
    await user.destroy();

    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ msg: error.message });
  }
};

// fitur createUser (manajemen user oleh admin)—yaitu membuat user dari panel admin, lengkap dengan role dan aksesnya (BU/Sub/Branch).

// Tujuan:
// Setelah user login, sistem menyimpan informasi siapa user-nya di session (req.session.userId).
// Kemudian informasi user bisa digunakan di setiap endpoint tanpa perlu login ulang.