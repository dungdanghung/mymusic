class Category {
    constructor(categoryID, categoryName, image) {
        this.categoryID = categoryID
        this.categoryName = categoryName
        this.image = image
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

module.exports = Category