const express = require("express")
const Router = express.Router()
const SongController = require("../controller/Song_controller")

Router.get("/getsonghot", SongController.GetSongHot)
Router.get("/getsong/:data", SongController.getsong)

module.exports = Router