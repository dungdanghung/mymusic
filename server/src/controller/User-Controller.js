const { users, refreshtoken, GetHeart, CreateNewUser, GetUser, GetListeningHistory } = require("../cache/index")
const { ReadAccessToken, CreateToken, CheckIsNumber } = require("../services/auth")
const bcrypt = require("bcrypt")

async function Login(req, res) {
    const data = {
        userName: req.body.username,
        password: req.body.password
    }

    const user = await GetUser(data.userName)
    if (user) {
        const dataheart = await GetHeart(user.userID)
        if (dataheart.length !== 0) {
            user.setarrayinteract(dataheart)
        }
        const datahistory = await GetListeningHistory(user.userID)
        if (datahistory.length !== 0) {
            user.setlisteningHistory(datahistory)
        }
        const checkpassword = bcrypt.compareSync(data.password, user.password)
        if (checkpassword) {
            const token = CreateToken({ ...user })
            refreshtoken.push(token.refreshToken)
            return res.json(token)
        }
    } else {
        return res.status(400).json("invalit data")
    }
}

async function Logout(req, res) {
    const AccessToken = req.headers['authorization'].split(' ')[1]
    const RefreshToken = req.body.RefreshToken
    const findrefreshtoken = refreshtoken.indexOf(RefreshToken)
    const tokenData = ReadAccessToken(AccessToken)
    if (!tokenData) return res.status(400).json("you not user")
    if (findrefreshtoken === -1) return res.status(400).json("you not user")

    const user = users.every((item, index) => {
        if (item.userName === tokenData.username) {
            users.splice(index, 1)
            refreshtoken.splice(findrefreshtoken, 1)
            return false
        }
        return true
    })
    if (!user) return res.sendStatus(200)
    else return res.sendStatus(500)
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
        password: CheckIsNumber(req.body.password) ? req.body.password : undefined
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
        const rs = await CreateNewUser(data)
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

async function Getuser(req, res) {
    const token = req.headers['authorization'].split(' ')[1]
    const data = ReadAccessToken(token)
    if (users.length !== 0) {
        let index = 0
        for (index; index < users.length; index++) {
            if (users[index].userName === data.username) {
                index = users[index]
                break
            }
        }
        if (index.userID) return res.json(index.ignoreProps('password', 'roleID', 'interact', 'phone', 'listeningHistory'))
        else return res.sendStatus(400)
    } else {
        return res.sendStatus(404)
    }
}

async function UpgradeVip(req, res) {
    console.log(123)
}




module.exports = {
    Register,
    Login,
    Logout,
    Getuser,
    UpgradeVip
}