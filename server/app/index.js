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
    let links = data.links || [];
    const playlistUrls = data.playlistUrls || [];

    if (links.length == 0 && playlistUrls.length == 0) {
        res.json({ success: false, message: "Keine Daten empfangen" })
        return;
    }

    let output = "";

    for(var i = 0; i < links.length; i++) {
        if (links[i]) {
            output += await process.createProcess(`youtube-dl -x --audio-format mp3 -o '/data/%(title)s-%(id)s.%(ext)s' '${links[i]}'`)
        }
    }

    for (var i = 0; i < playlistUrls.length; i++) {
        if (playlistUrls[i]) {
            output += await process.createProcess(`youtube-dl -x --audio-format mp3 -i --yes-playlist -o '/data/%(playlist)s/%(title)s-%(id)s.%(ext)s' '${playlistUrls[i]}'`)
        }
    }

    const extractedVideos = getExtractedVideos(output);

    links = links.map(x => ({ link: x }))
    links.map(l => {
        const video = extractedVideos.find(v => l.link.indexOf(v.id))
        l.success = !!video
    })

    const failedSingleLinks = links.filter(x => !x.success)
    const processedPlaylistUrls = extractedVideos.filter(e => links.filter(l => l.link.indexOf(e.id) <= -1).length === 0)
    
    res.json({ success: true, message: "Daten verarbeitet", processed: extractedVideos, failedSingleLinks, processedPlaylistUrls })
})

app.listen(port, () => console.log("listen on port " + port))

function getExtractedVideos(output) {
    const all = [...output.matchAll( /\[ffmpeg\] Destination:(.*?\-([a-z0-9\-]+?)\.mp3)/gi)]
    return all.map(x => {
        return {
            id: x[2],
            path: x[1]
        }
    })
}