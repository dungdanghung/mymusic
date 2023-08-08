class User {
    constructor(userID, firstName, lastName, userName, birth, roleID, roleName, sex, email, phone, avatar, password, heart) {
        this.userID = userID
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.birth = birth
        this.roleID = roleID
        this.roleName = roleName
        this.sex = sex
        this.email = email
        this.phone = phone
        this.avatar = avatar
        this.password = password
        this.heart = heart
        this.interact = []
        this.listeningHistory = []
    }
    ignoreProps() {
        const object = { ...this }
        const ignoreProps = Array.from(arguments)
        ignoreProps.forEach(key => {
            object[key] = undefined
        })
        return object
    }
    setarrayinteract(arr) {
        this.interact = arr
    }

    deleteInteract(songid) {
        const index = this.interact.indexOf(songid)
        if (index) {
            this.interact.splice(index, 1)
            return true
        } else return false
    }
    setInteract(songid) {
        const index = this.interact.indexOf(songid)
        if (index === -1) {
            this.interact.push(songid)
            return true
        } else return false
    }
    setlisteningHistory(data, type = "push") {
        if (type === "push") {
            this.listeningHistory.push(...data)
        } else {
            this.listeningHistory.unshift(...data)
        }
    }
    moveItemlistHistoryToFirst(song_id) {
        const item = this.listeningHistory.find(item => item === song_id)
        const index = this.listeningHistory.indexOf(item)
        this.listeningHistory.splice(index, 1)
        this.listeningHistory.unshift(item)
    }
}

module.exports = User