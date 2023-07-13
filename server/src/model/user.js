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

module.exports = User