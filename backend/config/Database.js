import {Sequelize} from "sequelize";

const db = new Sequelize('auth_db_v2', 'root', '', { //untuk nama database susuaikan jangan sampe sama nama databasenya 
    host: "localhost",
    dialect: "mysql"
});

export default db;