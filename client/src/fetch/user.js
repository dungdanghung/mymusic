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

async function uploadsong(file, songname, authername, token) {
    var formData = new FormData();
    formData.append("filesong", file.song);
    formData.append("fileimage", file.image);
    formData.append("songname", songname)
    formData.append("authername", authername)
    try {
        await requet.post('/user/uploadsong', formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    register,
    login,
    getuser,
    uploadsong
}