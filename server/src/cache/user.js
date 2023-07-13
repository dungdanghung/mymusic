const pool = require("../dataConnect/index")
const User = require("../model/user")

const users = []
async function UserInit() {
    try {
        const querystring = [
            "SELECT users.user_id, users.firstName, users.laseName, users.userName, users.birth,",
            "role_name, users.sex, users.email ,users.phoneNumber, users.avartar,users.password, users.heart from music.users",
            "JOIN roles on roles.role_id = users.role_id"
        ].join(' ')
        const [rs] = await pool.query(querystring)
        rs.forEach((item) => {
            const userID = item.user_id
            const firstName = item.firstName
            const laseName = item.laseName
            const userName = item.userName
            const birth = item.birth
            const role_id = item.role_id
            const sex = item.sex
            const email = item.email
            const phoneNumber = item.phoneNumber
            const avartar = item.avartar
            const password = item.password
            const heart = item.heart
            const user = new User(userID, firstName, laseName, userName, birth, role_id, sex, email, phoneNumber, avartar, password, heart)
            users.push(user)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize users data: ${error.message}`)
        throw new Error(`Fail to initialize users data: ${error.message}`)
    }
}

async function getUser(username) {
    try {
        const querystring = [
            "SELECT users.user_id, firstName, laseName, userName, birth, role_name, sex, email, phoneNumber, avartar, password, heart FROM music.users",
            "join roles on roles.role_id = users.role_id",
            "where users.userName = ?"
        ].join(' ')
        const [rows] = await pool.query(querystring, username)
        if (rows[0]) {
            const userID = rows[0].user_id
            const firstName = rows[0].firstName
            const laseName = rows[0].laseName
            const userName = rows[0].userName
            const birth = rows[0].birth
            const roleID = rows[0].role_id
            const roleName = rows[0].role_name
            const sex = rows[0].sex
            const email = rows[0].email
            const phoneNumber = rows[0].phoneNumber
            const avartar = rows[0].avartar
            const password = rows[0].password
            const heart = rows[0].heart
            const user = new User(userID, firstName, laseName, userName, birth, roleID, roleName, sex, email, phoneNumber, avartar, password, heart)
            users.push(user)
            return user
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

async function createNewUser(data) {
    try {
        const querystring = [
            "insert into users(firstName, laseName, userName, birth, role_id, sex, email, phoneNumber, password)",
            "value(?,?,?,?,2,?,?,?,?)"
        ].join(' ')
        const [row] = await pool.query(querystring, [data.firstName, data.lastName, data.userName, data.birth, data.gender, data.email, data.phone, data.password])
        return row
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    UserInit,
    createNewUser,
    getUser,
    users
}