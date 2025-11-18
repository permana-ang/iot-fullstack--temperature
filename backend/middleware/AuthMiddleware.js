import { Users, UserAccess } from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId)
    return res.status(401).json({ msg: "Mohon login terlebih dahulu!" });

  try {
    const user = await Users.findByPk(req.session.userId, {
      include: {
        model: UserAccess,
        as: "access" // ✅ harus persis seperti alias yang kamu definisikan
      }
    });

    if (!user)
      return res.status(404).json({ msg: "User tidak ditemukan" });

    req.user = user;
    req.access = user.access; // ✅ ini juga ikut aliasnya
    next();
  } catch (error) {
    console.error("verifyUser error:", error);
    res.status(500).json({ msg: error.message });
  }
};


export const authorizeAccess = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const user = await Users.findByPk(req.session.userId);
      if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

      const role = user.role;

      // Hirarki Role: administrator > adminBU > adminSU > adminBranch
      const roleHierarchy = {
        administrator: 4,
        adminBU: 3,
        adminSU: 2,
        adminBranch: 1,
      };

      const userLevel = roleHierarchy[role];
      const minLevel = Math.min(...allowedRoles.map(r => roleHierarchy[r] ?? 0));

      if (userLevel >= minLevel) {
        return next(); // ✅ Izin diberikan
      } else {
        return res.status(403).json({ msg: "Akses terlarang" });
      }

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  };
};




export const authorizeRoles = (roles = []) => {
  return async (req, res, next) => {
    try {
      const user = req.user || await Users.findByPk(req.session.userId, {
        include: UserAccess
      });

      if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }

      // Cek role
      if (!roles.includes(user.role)) {
        return res.status(403).json({ msg: "Akses ditolak!" });
      }

      // Ambil data akses (scope) dari UserAccess
      const access = user.UserAccess;

      // Buat scope dinamis
      req.scope = {};
      if (user.role === "adminBU") {
        req.scope = { businessUnit: access.businessUnit };
      } else if (user.role === "adminSU") {
        req.scope = {
          businessUnit: access.businessUnit,
          subUnit: access.subUnit
        };
      } else if (user.role === "adminBranch") {
        req.scope = {
          businessUnit: access.businessUnit,
          subUnit: access.subUnit,
          branch: access.branch
        };
      }

      // Simpan ke request
      req.user = user;
      req.access = access;

      next();
    } catch (error) {
      console.error("authorizeRoles error:", error);
      res.status(500).json({ msg: error.message });
    }
  };
};



export const verifyUsers = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  const user = await Users.findOne({
    where: { id: req.session.userId },
    include: {
      model: UserAccess,
      as: "access"
    }
  });

  if (!user) {
    return res.status(404).json({ msg: "User tidak ditemukan!" });
  }

  req.user = {
    id: user.id,
    role: user.role,
    username: user.username
  };

  req.access = {
    businessUnit: user.access?.businessUnit || null,
    subUnit: user.access?.subUnit || null,
    branch: user.access?.branch || null
  };

  next();
};




export const adminOnly = async (req, res, next) => {
  try {
    const currentUser = await Users.findOne({
      where: {
        id: req.session.userId
      }
    });

    if (!currentUser) return res.status(404).json({ msg: "User tidak ditemukan" });

    // Role admin yang diperbolehkan
    const allowedRoles = ["adminBU", "adminSU", "adminBranch"];
    if (!allowedRoles.includes(currentUser.role)) {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};