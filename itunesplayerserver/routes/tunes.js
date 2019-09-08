const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:term', async (req, res) => {
    try {
        const tunes = await GetTunes(req.params.term);
        res.json(tunes);
    } catch (err) {
        res.json({ message: err });
    }
});

const GetTunes = async term => {
    const termRequest = term.replace(new RegExp(/ /gi), "+");
    const limit = process.env.TUNES_LIMIT;
    const response = await fetch('https://itunes.apple.com/search?term=' + termRequest + '&limit=' + limit);
    const data = await response.json();
    return data.results.map(result => {
        return {
            trackId: result.trackId,
            kind: result.kind,
            artistName: result.artistName,
            collectionName: result.collectionName,
            trackName: result.trackName,
            releaseDate: result.releaseDate,
            previewUrl: result.previewUrl
        }
    }).filter(item => item.trackId);
}

module.exports = router;