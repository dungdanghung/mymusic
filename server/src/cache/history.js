const pool = require("./database")

async function GetListeningHistory(user_id, index = 0) {
    try {
        const querystring = [
            'SELECT song_id FROM listeningHistory WHERE user_id = ?  AND song_id > ? ORDER BY date DESC LIMIT 10'
        ].join(' ')
        const [rs] = await pool.query(querystring, [user_id, index])
        if (rs.length !== 0) {
            return rs.map((item) => {
                return item.song_id
            })
        } else return []
    } catch (error) {
        throw new Error(error.message)
    }
}

async function SetNewHistorySong(user_id, song_id) {
    try {
        const querystring = [
            'INSERT INTO listeninghistory (user_id, song_id, date)',
            'VALUE (?,?,current_date())'
        ].join(' ')
        await pool.query(querystring, [user_id, song_id])
        return true
    } catch (error) {
        throw new Error(error.message)
    }
}
async function UpdateHistorySong(user_id, song_id) {
    try {
        const querystring = [
            'UPDATE listeninghistory',
            'SET date = current_date()',
            'WHERE user_id = ? AND song_id = ?'
        ].join(' ')
        await pool.query(querystring, [user_id, song_id])
        return true
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {
    GetListeningHistory,
    SetNewHistorySong,
    UpdateHistorySong
}