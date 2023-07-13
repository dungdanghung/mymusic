const { users, refreshtoken, UploadSong } = require("../cache/index")
const { createNewUser, getUser } = require("../cache/user")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const ffmpeg = require("fluent-ffmpeg")
const fs = require("fs")
const probe = require('node-ffprobe')

async function Login(req, res) {
    const data = {
        userName: req.body.username,
        password: req.body.password
    }

    const user = await getUser(data.userName)
    if (user) {
        const checkpassword = bcrypt.compareSync(data.password, user.password)
        if (checkpassword) {
            const token = createToken({ ...user })
            refreshtoken.push(token.refreshToken)
            return res.json(token)
        }
    } else {
        return res.status(400).json("invalit data")
    }
}

async function Register(req, res) {
    const data = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        userName: req.body.username,
        email: isNaN(parseInt(req.body.emailorphone)) ? req.body.emailorphone : null,
        phone: isNaN(parseInt(req.body.emailorphone)) ? null : req.body.emailorphone,
        gender: req.body.gender === "male" ? 1 : 0,
        birth: req.body.birth,
        password: checkIsNumber(req.body.password) ? req.body.password : undefined
    }
    if (!data.password) return res.status(400).json("invalit password")
    const finduser = users.every((item) => {
        if (item.userName === data.userName) {
            res.status(400).json("userName is exist")
            return false
        } else if (item.email && item.email === data.email) {
            res.status(400).json("email is exist")
            return false
        } else if (item.phone === data.phone && item.phone !== undefined) {
            res.status(400).json("phone number is exist")
            return false
        }
        return true
    })
    if (!finduser) return res.json("user is exist")
    const a = bcrypt.hashSync(data.password, 10);
    data.password = a
    try {
        const rs = await createNewUser(data)
        if (rs && rs.insertId) {
            return res.status(200).json("create new user success")
        }
        else {
            return res.status(500).json("err create new user")
        }
    } catch (error) {
        return res.status(500)
    }
}

async function getuser(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const data = readAccessToken(token)
    const user = await getUser(data.username)
    if (user) return res.json(user.ignoreProps('password', 'roleID'))
    else return res.sendStatus(404)
}

async function uploadsong(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const tokenData = readAccessToken(token)
    const user = await getUser(tokenData.username)
    const imageFormats = ['image/png', 'image/jpg', 'image/jpeg']
    if (!user) return res.status(400).json({ errorMessages: "user not found" })
    const data = {
        song: req.files.filesong,
        image: req.files.fileimage,
        songname: req.body.songname,
        authername: req.body.authername,
        typeID: 1,
        userid: user.userID,
        songfile: `${Date.now()}-${user.userName}.${req.files.filesong.name}`,
        imagefile: req.files.fileimage ? `${Date.now()}_${user.userName}_${req.files.fileimage.name}` : "music_128x128.png"
    }
    console.log(data.song, data.image)
    if (!data.songname) return res.status(400).json("name song not found")
    if (!data.authername) return res.status(400).json("auther name not found")
    if (!data.song) return res.status(400).json({ errorMessages: "file not found" })
    if (data.song.mimetype !== "audio/mpeg") return res.status(400).json("type file error")
    if (!imageFormats.includes(data.image.mimetype)) return res.status(400).json("type image err")
    if (user.roleName === "admin") {
        if (data.imagefile !== "music_128x128.png") {
            await data.image.mv("src/public/images/thumbnailsong/" + data.imagefile, (err) => {
                if (err) return res.status(400).json("file err")
            })
        }
        await data.song.mv("src/songdata/" + data.songfile, (err) => {
            if (err) return res.status(400).json("file err")
        })
        ffmpeg(`src/songdata/${data.songfile}`)
            .videoCodec('libx264')
            .audioCodec('libmp3lame')
            .toFormat("mp3")
            .noVideo()
            .audioBitrate("126k")
            .on('error', function (err) {
                fs.unlinkSync("src/songdata/" + data.songfile);
                res.status(500).json("error save song")
            })
            .on('end', async function () {
                fs.unlinkSync("src/songdata/" + data.songfile);
                const rs = await UploadSong(data)
                if (rs) {
                    res.status(200).json(rs)
                }
            })
            .output(`src/songdata/33k_${data.songfile}`)
            .run()
    } else return res.status(400).json("not admin")
}

function formatDate(date) {
    const formatedDate = new Date(date)
    return formatedDate?.toISOString().split('T')[0]
}

function checkIsNumber(data) {
    const rs = Array.from(data).every((item) => {
        if (isNaN(parseInt(item))) {
            return false
        }
        return true
    })
    return rs
}

function createToken(user) {
    const token = {
        accessToken: '',
        refreshToken: ''
    }
    function signAccessToken(user) {
        const token = jwt.sign(JSON.stringify({
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: user.userID,
            username: user.userName
        }), "ssh")
        return token
    }
    function signRefreshToken(user) {
        const token = jwt.sign(JSON.stringify({
            iat: Math.floor(Date.now() / 1000),
            id: user.userID,
            username: user.userName
        }), "ssh")
        return token
    }
    token.accessToken = signAccessToken(user)
    token.refreshToken = signRefreshToken(user)
    return token
}
function readAccessToken(token) {
    return jwt.decode(token)
}

function reCreateToken(req, res) {
    const token = req.body.refreshToken
    const index = refreshtoken.indexOf(token)
    if (index === -1) res.status(404)
    else {
        const user = jwt.decode(token)
        const newToken = createToken(user)
        refreshtoken.splice(index, 1)
        refreshtoken.push(newToken.refreshToken)
        res.json(newToken)
    }
}

function authenticateToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) res.sendStatus(401)
    else {
        const token = authorizationHeader.split(' ')[1]
        if (!token) res.sendStatus(402)
        else {
            try {
                jwt.verify(token, "ssh")
                next()
            } catch (errorMessages) {
                res.sendStatus(403)
            }
        }
    }
}




module.exports = {
    Register,
    Login,
    getuser,
    uploadsong,
    authenticateToken
}