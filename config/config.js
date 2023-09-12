const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


module.exports={
    port:process.env.PORT,
    secretkey: process.env.JWT_SECRET,
    database:{
        dbport:process.env.DB_PORT,
        dbhost:process.env.HOST,
        dbuser:process.env.USER,
        dbpassword:process.env.PASSWORD,
        database :process.env.DATABASE,
        dbdialect:process.env.dialect
       
    },
    pool: {
        max: process.env.MAX,
        min: process.env.MIN,
        acquire: process.env.ACQUIRE,
        idle: process.env.IDLE
      }
} 
