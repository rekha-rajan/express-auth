const express =require('express');
const userRouter = express.Router();


const {allAccess,userBoard,adminBoard,moderatorBoard} = require("../controllers/userController");
const { verifyToken, isAdmin, isModerator, isModeratorOrAdmin } = require("../middlewares/authJWT");
console.log(verifyToken);

userRouter.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  userRouter.get("/test/all", allAccess);

  userRouter.get("/test/user",[verifyToken,isModeratorOrAdmin],userBoard);

  userRouter.get("/test/mod",[verifyToken, isModerator],moderatorBoard );

  userRouter.get("/test/admin",[verifyToken, isAdmin],adminBoard);

module.exports=userRouter;