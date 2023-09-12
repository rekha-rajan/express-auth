const express = require("express");
const authRouter = express.Router();

const {
  userValidationRules,
  validate,
} = require("../validators/userValidator.js");
const {insertUser, loginUser} = require("../controllers/authController");

//User Sign up
authRouter.post("/signup", userValidationRules(), validate, insertUser);
authRouter.post('/login', loginUser);


 
module.exports = authRouter;
