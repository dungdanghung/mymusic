import requet from "../fetch/index"

async function register(data) {
    try {
        const rs = await requet.post("/user/register", {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            emailorphone: data.emailorphone,
            gender: data.gender,
            birth: data.birth,
            password: data.password
        })
        if (rs) return rs.data
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

async function login(data) {
    try {
        const rs = await requet.post("/user/login", {
            username: data.username,
            password: data.password
        })
        if (rs) return rs.data
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }

}

async function logout() {
    try {
        let token = window.localStorage.getItem("token")
        token = JSON.parse(token)
        const rs = await requet.post("/user/logout", { RefreshToken: token.refreshToken }, {
            headers: {
                "Authorization": `accessToken ${token.accessToken}`
            },
        })
        return rs.status
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

async function getuser(token) {
    try {
        const rs = await requet.get("/user/getuser", {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        if (rs) return rs.data
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `err users data: ${error.message}`)
    }
}

async function upgradevip() {
    return new Promise(async (resolve, reject) => {
        let token = window.localStorage.getItem("token")
        if (token) {
            token = JSON.parse(token)
            const rs = await requet.post("/user/upgradevip", {}, {
                headers: {
                    "authorization": `accessToken ${token.accessToken}`,
                }
            })
        }
    })
}

export {
    register,
    login,
    logout,
    getuser,
    upgradevip
}