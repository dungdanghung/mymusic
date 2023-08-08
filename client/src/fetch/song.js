import requet from "../fetch/index"

async function GetSongHot() {
    try {
        let token = window.localStorage.getItem("token")
        if (token) {
            token = JSON.parse(token)
            const rs = await requet.get("/song/getsonghot", {
                headers: {
                    "Authorization": `accessToken ${token.accessToken}`
                },
            })
            if (rs.data) return rs.data
            else return []
        } else {
            const rs = await requet.get("/song/getsonghot")
            if (rs.data) return rs.data
            else return []
        }
    } catch (error) {
        throw new Error(error)
    }
}
async function DeleteHeartInteract(songid) {
    try {
        let token = window.localStorage.getItem("token")
        if (token && songid) {
            token = JSON.parse(token)
            await requet.delete("/song/deleteinteract", {
                headers: {
                    "Authorization": `accessToken ${token.accessToken}`,
                    "songID": songid
                },
            })
        } else {
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}
async function SetheartInteract(songid) {
    try {
        let token = window.localStorage.getItem("token")
        if (token && songid) {
            token = JSON.parse(token)
            const rs = await requet.post("/song/setheartinteract", { songID: songid }, {
                headers: {
                    "Authorization": `accessToken ${token.accessToken}`
                }
            })
            if (rs.data) return rs.data
            else return false
        } else {
            return false
        }
    } catch (error) {
        throw new Error(error)
    }
}

async function GetHistory(index = 0) {
    return new Promise(async (resolve, reject) => {
        let token = window.localStorage.getItem("token")
        if (token) {
            token = JSON.parse(token)
            const rs = await requet.get("/song/gethistory", {
                headers: {
                    "Authorization": `accessToken ${token.accessToken}`,
                    index: index
                },
            })
            if (rs.data?.length !== 0) resolve(rs.data)
            else resolve([])
        } else reject()
    })
}

async function SetHistorySong(song_id) {
    try {
        let token = window.localStorage.getItem("token")
        if (token) {
            token = JSON.parse(token)
            await requet.post("/song/sethistorysong", { song_id: song_id }, {
                headers: {
                    "Authorization": `accessToken ${token.accessToken}`,
                }
            })
            return true
        }
        return false
    } catch (error) {
        console.log(new Error(error.message))
        return false
    }
}

async function GetHeartSongs() {
    return new Promise(async (resolve, reject) => {
        let token = window.localStorage.getItem("token")
        if (token) {
            token = JSON.parse(token)
            const rs = await requet.get("/song/getheartsongs", {
                headers: {
                    "Authorization": `accessToken ${token.accessToken}`,
                }
            })
            if (rs.data.length !== 0) resolve(rs.data)
            else resolve([])
        } else reject()
    })
}
async function uploadsong(data, token) {
    var formData = new FormData();
    formData.append("filesong", data.filesong);
    formData.append("fileimage", data.fileimage);
    formData.append("filethumbnail", data.filethumbnail);
    formData.append("songname", data.songname)
    formData.append("imagename", data.imagename)
    formData.append("thumbnailname", data.thumbnailname)
    formData.append("singer", data.singer)
    try {
        await requet.post('/song/uploadsong', formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
    } catch (error) {
        throw new Error(error.message)
    }
}
async function GetThumbnailSongHot(limit) {
    try {
        const rs = await requet.get("/song/getthumbnailhotsong", {
            params: {
                limit: limit
            }
        })
        if (rs.data.length !== 0) return rs.data
        return []
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    GetSongHot,
    DeleteHeartInteract,
    SetheartInteract,
    GetHistory,
    SetHistorySong,
    GetHeartSongs,
    uploadsong,
    GetThumbnailSongHot
}