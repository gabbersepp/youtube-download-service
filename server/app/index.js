const express = require("express")
const cors = require('cors')
const process = require("./process.js");

const port = 8081

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/process", async (req, res) => {
    if (!req.body || req.body === "") {
        res.sendStatus(400);
        return;
    }

    console.log(JSON.stringify(req.body));

    const data = req.body;
    const links = data.links || [];

    for(var i = 0; i < links.length; i++) {
        if (links[i] && links[i] !== "") {
            await process.createProcess(`youtube-dl -x --audio-format mp3 -o '/data/%(title)s-%(id)s.%(ext)s' '${links[i]}'`)
        }
    }

    const playlistUrls = data.playlistUrls || [];

    for (var i = 0; i < playlistUrls.length; i++) {
        if (playlistUrls[i] && playlistUrls[i] !== "") {
            await process.createProcess(`youtube-dl -x --audio-format mp3 -i --yes-playlist -o '/data/%(playlist)s/%(title)s-%(id)s.%(ext)s' '${playlistUrls[i]}'`)
        }
    }

    res.sendStatus(200)
})

app.listen(port, () => console.log("listen on port " + port))