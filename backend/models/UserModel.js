import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define("Users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("administrator", "adminBU", "adminSU", "adminBranch"),
    allowNull: false
  }
}, {
  freezeTableName: true
});

// export default Users;


const UserAccess = db.define("UserAccess", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM("adminBU", "adminSU", "adminBranch"),
    allowNull: false
  },
  businessUnit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subUnit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true
});

// Relasi ke Users
Users.hasOne(UserAccess, { foreignKey: "userId", onDelete: "CASCADE", as: "access" });
UserAccess.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE", as: "User" });

export {
    Users,
    UserAccess
};
