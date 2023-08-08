const { songs, users, DeleteHeart, SetHeart, SetNewHistorySong, UpdateHistorySong, UploadSong, GetUser, GetSongByID } = require("../cache/index")
const jwt = require("jsonwebtoken")
const { ReadAccessToken, CheckSongToken, CheckIsNumber } = require("../services/auth")
const ffmpeg = require("fluent-ffmpeg")
const fs = require("fs")

async function GetSongHot(req, res) {
    const AccessToken = req.headers['authorization']?.split(' ')[1]
    const tokenData = ReadAccessToken(AccessToken)
    if (tokenData) {
        const user = users.find(item => item.userName === tokenData.username)
        if (!user) return res.status(400).json("user not found")
        if (user) {
            const rs = songs.map((item, index) => {
                if (index > 0) {
                    if (user.interact.includes(item.songID)) {
                        return {
                            ...CheckSongToken(item).ignoreProps("songfile", "date", "typeID", "description", "songtoken"),
                            heart: true,
                        }
                    } else {
                        return CheckSongToken(item).ignoreProps("songfile", "date", "typeID", "description", "songtoken")
                    }
                }
            })
            rs.shift()
            return res.status(200).json(rs)

        }
    } else {
        const rs = songs.map((item, index) => {
            if (index > 0) {
                return CheckSongToken(item).ignoreProps("songfile", "date", "typeID", "description", "songtoken")
            }
        })
        rs.shift()
        return res.status(200).json(rs)
    }
}
async function GetSong(req, res) {
    if (!req.params.data) return res.status(400)
    const token = jwt.verify(req.params.data, 'secret');
    if (!token) return res.status(400)
    const options = {
        root: `./store/songdata`
    };
    const fileName = token.songfile;
    return res.sendFile(fileName, options);
}
async function DeleteInteract(req, res) {
    if (req.headers) {
        const song_id = req.headers.songid
        const AccessToken = req.headers['authorization']?.split(' ')[1]
        const tokenData = ReadAccessToken(AccessToken)
        if (!CheckIsNumber([song_id])) return res.status(400).json("song not found")
        const user = users.find(item => item.userName === tokenData.username)
        if (user) {
            const deletecach = user.deleteInteract(song_id)
            if (deletecach) {
                await DeleteHeart(tokenData.id, parseInt(song_id))
                return res.status(200).json(song_id)
            } else return res.status(400).json("you not interact this song")
        } else return res.status(400).json("user not found")
    }
}
async function SetInteract(req, res) {
    if (req.headers) {
        const song_id = req.body.songID
        const AccessToken = req.headers['authorization']?.split(' ')[1]
        const tokenData = ReadAccessToken(AccessToken)
        if (!CheckIsNumber([song_id])) return res.status(400).json("song not found")
        const user = users.find(item => item.userName === tokenData.username)
        if (user) {
            const setcach = user.setInteract(song_id)
            if (setcach) {
                await SetHeart(tokenData.id, parseInt(song_id))
                return res.status(200).json(song_id)
            } else return res.status(400)
        } else return res.status(400)
    }
}
async function GetHistory(req, res) {
    const data = {
        index: req.headers.index
    }
    if (!CheckIsNumber(data)) return res.status(400).json("data you give not valit")
    const AccessToken = req.headers['authorization'].split(' ')[1]
    const dataToken = ReadAccessToken(AccessToken)
    const user = users.find(item => item.userName === dataToken.username)
    if (!user) return res.status(400).json("user not found")
    if (data.index > user.listeningHistory.length) return res.json("data you give not valit")
    const rs = []
    await user.listeningHistory.every(async (item, index) => {
        if (rs.length === 10) return false
        if (index >= data.index) {
            const song = await GetSongByID(item)
            if (user.interact.includes(item) && song) {
                rs.push({
                    ...CheckSongToken(song).ignoreProps("songfile", "date", "typeID", "description", "songtoken"),
                    heart: true
                })
            } else if (song) {
                rs.push(CheckSongToken(song).ignoreProps("songfile", "date", "typeID", "description", "songtoken"))
            }
        }
        return true
    })
    return res.status(200).json(rs)
}
async function SetHistorySong(req, res) {
    const songid = req.body.song_id
    if (!CheckIsNumber([songid])) return res.status(400).json("err song")
    const AccessToken = req.headers['authorization'].split(' ')[1]
    const dataToken = ReadAccessToken(AccessToken)
    const user = users.find(item => item.userID === dataToken.id)
    if (user && user.listeningHistory.indexOf(songid) === -1) {
        const rs = await SetNewHistorySong(user.userID, songid)
        if (!rs) return res.sendStatus(500)
        user.setlisteningHistory([songid], "unshift")
        return res.sendStatus(200)
    } else if (user && user.listeningHistory.indexOf(songid) !== -1) {
        const rs = await UpdateHistorySong(dataToken.id, songid)
        if (!rs) return res.sendStatus(500)
        user.moveItemlistHistoryToFirst(songid)
        return res.sendStatus(200)
    }
}
async function GetHeartSongs(req, res) {
    const AccessToken = req.headers['authorization'].split(' ')[1]
    const dataToken = ReadAccessToken(AccessToken)
    const user = users.find(item => item.userID === dataToken.id)
    if (!user) return res.sendStatus(500)
    const resuls = []
    await user.interact.map(async (item) => {
        const song = await GetSongByID(item)
        if (song) {
            const a = {
                ...CheckSongToken(song).ignoreProps("songfile", "date", "typeID", "description", "songtoken"),
                heart: true
            }
            resuls.push(a)
        }
    })
    return res.status(200).json(resuls)
}
async function Uploadsong(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = ReadAccessToken(token)
    const user = await GetUser(tokenData.username)
    const imageFormats = ['image/png', 'image/jpg', 'image/jpeg']
    if (!user) return res.status(400).json({ errorMessages: "user not found" })
    const data = {
        song: req.files.filesong,
        image: req.files.fileimage,
        thumbnail: req.files.filethumbnail,
        songname: req.body.songname,
        imagename: req.body.imagename,
        thumbnailname: req.body.thumbnailname,
        singer: req.body.singer,
        typeID: 1,
        userid: user.userID,
        songfile: `${Date.now()}-${user.userName}.${req.files.filesong.name}`,
        imagefile: req.files.fileimage ? `${Date.now()}_${user.userName}_${req.files.fileimage.name}` : "music_128x128.png",
        thumbnailfile: req.files.filethumbnail ? `${Date.now()}_${user.userName}_${req.files.filethumbnail.name}` : undefined,
    }
    const checkitem = Array.from(data).every((item) => {
        if (!item) return false
        return true
    })
    if (!checkitem) return res.status(400).json("err prop")
    if (data.song.mimetype !== "audio/mpeg") return res.status(400).json("type file error")
    if (!imageFormats.includes(data.image.mimetype)) return res.status(400).json("type image err")
    if (!imageFormats.includes(data.thumbnail.mimetype)) return res.status(400).json("type thumbnail err")

    if (user.roleName === "admin") {
        if (data.imagefile !== "music_128x128.png") {
            await data.image.mv("store/images/thumbnailsong/" + data.imagefile, (err) => {
                if (err) return res.status(400).json("file err")
            })
        }
        await data.thumbnail.mv("store/images/thumbnailsong-1280x780/" + data.thumbnailfile, (err) => {
            if (err) return res.status(400).json("file err")
        })
        await data.song.mv("store/songdata/128k" + data.songfile, (err) => {
            if (err) return res.status(400).json("file err")
        })
        ffmpeg(`store/songdata/128k${data.songfile}`)
            .videoCodec('libx264')
            .audioCodec('libmp3lame')
            .toFormat("mp3")
            .noVideo()
            .audioBitrate("128k")
            .on('error', function (err) {
                fs.unlinkSync("store/songdata/128k" + data.songfile);
                res.status(500).json("error save song")
            })
            .on('end', async function () {
                fs.unlinkSync("store/songdata/128k" + data.songfile);
                const rs = await UploadSong(data)
                if (rs) {
                    res.status(200).json(rs)
                }
            })
            .output(`store/songdata/${data.songfile}`)
            .run()
    } else return res.status(400).json("not admin")
}
async function GetHotThumbnail(req, res) {
    const rs = []; let index = 0
    if (!CheckIsNumber([req.query.limit]) || parseInt(req.query.limit) > 7) return res.sendStatus(400)
    songs.every((item, index) => {
        if (index >= parseInt(req.query.limit) + 1) return false
        if (index !== 0) {
            rs.push(item.ignoreProps("songfile", "date", "typeID", "description", "songtoken", "songName", "image", "heart", "singer"))
        }
        return true
    })
    return res.json(rs)
}


module.exports = {
    GetSongHot,
    GetSong,
    DeleteInteract,
    SetInteract,
    GetHistory,
    SetHistorySong,
    GetHeartSongs,
    Uploadsong,
    GetHotThumbnail
}


