const express = require("express")
const Router = express.Router()
const SongController = require("../controller/Song_controller")
const { AuthenticateToken } = require("../services/auth")

Router.get("/getsonghot", SongController.GetSongHot)
Router.get("/getsong/:data", SongController.GetSong)
Router.post("/setheartinteract", AuthenticateToken, SongController.SetInteract)
Router.delete("/deleteinteract/", AuthenticateToken, SongController.DeleteInteract)
Router.get("/gethistory", AuthenticateToken, SongController.GetHistory)
Router.post("/sethistorysong", AuthenticateToken, SongController.SetHistorySong)
Router.get("/getheartsongs", AuthenticateToken, SongController.GetHeartSongs)
Router.post("/uploadsong", AuthenticateToken, SongController.Uploadsong)
Router.get("/getthumbnailhotsong", SongController.GetHotThumbnail)

module.exports = Router