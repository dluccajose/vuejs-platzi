import config from './config'

const API = config.apiKey
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${API}&format=json`

export default function getArtist(pais) {
    const url = URL.replace(":country", pais)
    return fetch(url)
        .then(res => res.json())
        .then(json => json.topartists.artist)
}