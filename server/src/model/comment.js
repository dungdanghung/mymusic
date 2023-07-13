class Comment {
    constructor(commentID, userID, songID, text, date) {
        this.commentID = commentID
        this.userID = userID
        this.songID = songID
        this.text = text
        this.date = date
    }
    ignoreProps() {
        const object = { ...this }
        const ignoreProps = Array.from(arguments)
        ignoreProps.forEach(key => {
            object[key] = undefined
        })
        return object
    }
}

module.exports = Comment