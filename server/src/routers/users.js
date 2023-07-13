const express = require("express")
const Router = express.Router()
const UserController = require("../controller/User-Controller")

Router.post("/register", UserController.Register)
Router.post("/login", UserController.Login)
Router.get("/getuser", UserController.getuser)
Router.post("/uploadsong", UserController.authenticateToken, UserController.uploadsong)

module.exports = Router