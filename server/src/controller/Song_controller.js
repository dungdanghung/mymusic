const { songs } = require("../cache/index")
const http = require('http'),
    fileSystem = require('fs'),
    path = require('path');
const jwt = require("jsonwebtoken")

const listsongtoken = new Map()

async function GetSongHot(req, res) {
    let rs
    if (listsongtoken.size === 0) {
        rs = songs.map((item) => {
            const songtoken = jwt.sign(JSON.stringify({
                songfile: item.songfile,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }), 'secret')
            listsongtoken.set(item.songfile, songtoken)
            item.settoken(songtoken)
            item.setlink(`http://localhost:4000/api/song/getsong/${item.songtoken}`)
            return item
        })
    } else {
        rs = songs.map((item) => {
            if (listsongtoken.has(item.songfile)) {
                const data = jwt.decode(item.songtoken)
                if (data) {
                    return item
                }
                else if (!data) {
                    listsongtoken.delete(item.songfile)
                    const songtoken = jwt.sign(JSON.stringify({
                        songfile: item.songfile,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    }), 'secret')
                    listsongtoken.set(item.songfile, songtoken)
                    item.settoken(songtoken)
                    item.setlink(`http://localhost:4000/api/song/getsong/${item.songtoken}`)
                    return item
                }
            }
        })
    }
    return res.json(rs.map(item => item.ignoreProps("songfile", "date", "typeID", "description", "songtoken")))
}

async function getsong(req, res) {
    if (!req.params.data) return res.status(400)
    const token = jwt.verify(req.params.data, 'secret');
    if (!token) return res.status(400)
    const options = {
        root: `./src/songdata`
    };
    const fileName = token.songfile;
    return res.sendFile(fileName, options);
}


module.exports = {
    GetSongHot,
    getsong,
}


