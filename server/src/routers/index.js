const SongsRouter = require("./songs")
const UserRouter = require("./users")

function Router(app) {
    app.use("/api/song", SongsRouter)
    app.use('/api/user', UserRouter)
}

module.exports = Router