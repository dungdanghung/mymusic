const { refreshtoken } = require("../cache/index")
const jwt = require('jsonwebtoken')

function FormatDate(date) {
    const formatedDate = new Date(date)
    return formatedDate?.toISOString().split('T')[0]
}

function CheckIsNumber(data) {
    const rs = Array.from(data).every((item) => {
        if (isNaN(parseInt(item))) {
            return false
        }
        return true
    })
    return rs
}

function CreateToken(user) {
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
function ReadAccessToken(token) {
    return jwt.decode(token)
}

function ReCreateToken(req, res) {
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

function AuthenticateToken(req, res, next) {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) res.sendStatus(402)
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

function CheckSongToken(songitem) {
    if (!songitem.songtoken) {
        const songtoken = jwt.sign(JSON.stringify({
            songfile: songitem.songfile,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }), 'secret')
        songitem.settoken(songtoken)
        songitem.setlink(`http://localhost:4000/api/song/getsong/${songitem.songtoken}`)
        return songitem
    } else {
        const data = jwt.decode(songitem.songtoken)
        if (data) {
            return songitem
        } else {
            const songtoken = jwt.sign(JSON.stringify({
                songfile: songitem.songfile,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }), 'secret')
            songitem.settoken(songtoken)
            songitem.setlink(`http://localhost:4000/api/song/getsong/${songitem.songtoken}`)
            return songitem
        }
    }
}


module.exports = {
    FormatDate,
    AuthenticateToken,
    ReCreateToken,
    ReadAccessToken,
    CreateToken,
    CheckIsNumber,
    CheckSongToken
}