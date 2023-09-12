const config=require('./config/config')
const express =require('express');


const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const  sequelize = db.sequelize;  
const app = express();


app.use(bodyParser.json());
app.use(cors());
const authRoute = require('./routes/authRoute.js');
const userRouter = require('./routes/userRoute.js');

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

app.use('/user', authRoute);
app.use('/test', userRouter);
app.listen(config.port, ()=>{
    console.log(`server is listening  on ${config.port}`);
});
 
module.exports = app;
