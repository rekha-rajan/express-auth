const db = require('../config/db');
const config=require('../config/config')
const bcrypt=require('bcrypt');  
const User = db.users;
const Role=db.role;
const Op = db.Sequelize.Op;

module.exports = {
   insertUser
};
 
async function  insertUser(req,res) {
  const {email,password,roles}=req.body;
  await User.create({
    email: email,
    password: bcrypt.hashSync(password, 8)
}).then(user => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
}
