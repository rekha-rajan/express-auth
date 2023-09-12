const db = require('../config/db');
const config = require('../config/config')
const bcrypt=require('bcrypt');  
const User = db.Users;
const Role= db.Role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const jwtexpiry = 12;
module.exports = {
   insertUser, loginUser
};
 
async function  insertUser(req, res) {
  const {email, password, roles} = req.body;
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

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, config.secretkey, {
      algorithm: "HS256",
      expiresIn: jwtexpiry, // 24 hours
    });

    // Get user's roles and create an array of authorities
    const authorities = [];
    const roles = await user.getRoles();
    for (const role of roles) {
      authorities.push("ROLE_" + role.name.toUpperCase());
    }

    // Send the response with user details and token
    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
}
