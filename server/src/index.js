const { networkInterfaces } = require('os')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Router = require("./routers/index")
const { InitCache } = require("./cache/index")
const path = require("path")
const fileUpload = require("express-fileupload")
const PORT = parseInt(process.env['PORT'])
const app = express()

app.use(express.static("./store/images"))
app.use(express.json())
app.use(cors({
    origin: '*',
    "preflightContinue": false,
}))

app.use(fileUpload({
    // useTempFiles: true,
    // tempFileDir: './src/songdata'
}));
// InitCache()

Router(app)
function getIPAddress() {
    const nets = networkInterfaces()
    const results = {}
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!results[name]) {
                    results[name] = []
                }
                results[name].push(net.address);
            }
        }
    }
    return results
}
app.listen(PORT, () => {
    console.log("\x1b[32m%s\x1b[0m", getIPAddress()['Wi-Fi'] + ':' + PORT)
})
