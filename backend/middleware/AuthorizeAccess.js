// middleware/AuthorizeAccess.js
import { UserAccess } from "../models/UserModel.js";

export const authorizeAccess = async (req, res, next) => {
  try {
    const access = await UserAccess.findOne({
      where: { userId: req.user.id }
    });

    if (!access) {
      return res.status(403).json({ msg: "Akses lokasi tidak ditemukan" });
    }

    req.access = {
      businessUnit: access.businessUnit,
      subUnit: access.subUnit,
      branch: access.branch
    };

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


// Tujuan:
// Ambil informasi akses lokasi user dari tabel UserAccess
// Simpan ke req.access supaya bisa dipakai di controller