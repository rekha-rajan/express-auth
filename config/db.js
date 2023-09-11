const config = require('./config.js');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const { dbhost, dbport, dbuser, dbpassword, database, dbdialect } = config.database;
   
const pool =  mysql.createPool({
   host:dbhost,
   port:dbport,
   user: dbuser, password:dbpassword });
 
pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
const db = {};
const sequelize = new Sequelize(database, dbuser, dbpassword, { dialect: dbdialect,
pool: {
   max: parseInt(config.pool.max),
   min: parseInt(config.pool.min),
   acquire: config.pool.acquire,
   idle: config.pool.idle
   }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require('../models/users.js')(sequelize, Sequelize);
db.Role = require('../models/role.js')(sequelize, Sequelize);
db.Users.belongsToMany(db.Role, { through: 'user_role' });
// db.user_role = require('../models/user_role.js')(sequelize, Sequelize, db.Users, db.Role);
sequelize.sync({alter:true});
module.exports = db;                                                                   