const express = require("express");
const authRouter = express.Router();

const {
  userValidationRules,
  validate,
} = require("../validators/userValidator.js");
const {insertUser} = require("../controllers/authController");

//User Sign up
authRouter.post("/signup", userValidationRules(), validate, insertUser);
 
module.exports = authRouter;
