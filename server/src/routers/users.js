const express = require("express")
const Router = express.Router()
const UserController = require("../controller/User-Controller")
const { AuthenticateToken } = require("../services/auth")

Router.post("/register", UserController.Register)
Router.post("/login", UserController.Login)
Router.post("/logout", AuthenticateToken, UserController.Logout)
Router.get("/getuser", UserController.Getuser)
Router.post("/upgradevip", AuthenticateToken, UserController.UpgradeVip)
Router.post("/crop-avatar", UserController.CropAvatar)
Router.get("/get-avatar-crop", UserController.getAvatarCrop)


module.exports = Router