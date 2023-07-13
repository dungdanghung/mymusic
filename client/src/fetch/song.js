import requet from "../fetch/index"

async function GetSongHot() {
    try {
        const rs = await requet.get("/song/getsonghot")
        if (rs.data) return rs.data
        else return []
    } catch (error) {
        throw new Error(error)
    }
}


export {
    GetSongHot
}