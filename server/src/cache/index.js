const { SongInit, songs, UploadSong } = require("./song")
const { UserInit, users } = require("./user")
const refreshtoken = []

async function InitCache() {
    console.log('\x1b[1m%s\x1b[0m', 'Initializing data...')
    try {
        const results = await Promise.allSettled([
            SongInit(),
            UserInit()
        ])
        results.forEach(promise => {
            if (promise.status === 'rejected') throw new Error('Fail to initialize data')
        })
        console.log('\x1b[32m%s\x1b[0m', 'Initialized data')
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', error.message)
        throw new Error(`Fail to initialize data: ${error.message}`)
    }
}

module.exports = { InitCache, songs, users, refreshtoken, UploadSong }