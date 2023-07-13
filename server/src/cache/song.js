const pool = require("../dataConnect/index")
const Song = require("../model/song")

const songs = []
async function SongInit() {
    try {
        const querystring = [
            "SELECT songs.song_id, songs.song_name,songs.song_file, songs.date, songs.image,",
            "songs.type_id,songs.user_id, songs.heart, songs.description, songs.singer FROM music.songs"
        ].join(' ')
        const [rs] = await pool.query(querystring)
        rs.forEach((item) => {
            const songID = item.song_id
            const songName = item.song_name
            const songFile = item.song_file
            const date = item.date
            const image = item.image
            const userID = item.user_id
            const typeID = item.type_id
            const heart = item.heart
            const description = item.description
            const singer = item.singer
            const song = new Song(songID, songName, songFile, date, image, userID, typeID, heart, description, singer)
            songs.push(song)
        })
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize songs data: ${error.message}`)
        throw new Error(`Fail to initialize songs data: ${error.message}`)
    }
}

async function UploadSong(data) {
    try {
        const querystring = [
            "INSERT INTO songs (song_name,song_file,date,type_id,image,user_id)",
            "VALUES (?,?,current_date(),?,?,?)"
        ].join(' ')
        const [rows] = await pool.query(querystring, [data.songname, data.songfile, data.typeID, data.imagefile, data.userid,])
        if (rows) return rows.insertId
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Fail to initialize songs data: ${error.message}`)
        throw new Error(`Fail to initialize songs data: ${error.message}`)
    }
}


module.exports = { SongInit, songs, UploadSong }