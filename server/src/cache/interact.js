const pool = require("./database")

async function GetHeart(user_id) {
    try {
        const querystring = [
            'SELECT song_id FROM interacts WHERE interacts.user_id = ? ORDER BY date DESC'
        ].join(' ')
        const [rs] = await pool.query(querystring, [user_id])
        if (rs.length !== 0) {
            const arrheart = rs.map((item) => {
                return item.song_id
            })
            return arrheart
        } else return []
    } catch (error) {
        throw new Error(error.message)
    }
}
async function DeleteHeart(user_id, song_id) {
    try {
        const querystring = [
            'DELETE FROM interacts WHERE user_id = ? AND song_id = ?'
        ].join(' ')
        await pool.query(querystring, [user_id, song_id])
    } catch (error) {
        throw new Error(error.message)
    }
}
async function SetHeart(user_id, song_id) {
    try {
        const querystring = [
            'INSERT INTO interacts (user_id, song_id, date)',
            'VALUES (?,?,current_date())'
        ].join(' ')
        await pool.query(querystring, [user_id, song_id])
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    GetHeart,
    DeleteHeart,
    SetHeart
}