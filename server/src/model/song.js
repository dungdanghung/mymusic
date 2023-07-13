class Song {
    constructor(songID, songName, songFile, date, image, userID, typeID, heart, description, singer) {
        this.songID = songID
        this.songName = songName
        this.songfile = songFile
        this.date = date
        this.typeID = typeID
        this.image = image
        this.userID = userID
        this.heart = heart
        this.description = description
        this.singer = singer
        this.songtoken
        this.music
    }
    ignoreProps() {
        const object = { ...this }
        const ignoreProps = Array.from(arguments)
        ignoreProps.forEach(key => {
            object[key] = undefined
        })
        return object
    }
    settoken(prop) {
        this.songtoken = prop
    }
    setlink(prop) {
        this.music = prop
    }
}

module.exports = Song