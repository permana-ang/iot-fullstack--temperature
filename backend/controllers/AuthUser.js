// middleware/AuthUser.js
import { Users } from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Silakan login terlebih dahulu" });
  }

  try {
    const user = await Users.findOne({
      where: { id: req.session.userId }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    req.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
