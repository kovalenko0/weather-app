const axios = require('axios')
const express = require('express')
const app = express()

const OPEN_WEATHER_API_KEY = 'a4e3edb428bf75326bc37d0fcf6dd1a6'

app.get('/api/weather/:geoname_id', async (req, res) => {
    try {
        const {geoname_id} = req.params
        const locationResponse = await axios.get(`https://api.teleport.org/api/cities/geonameid:${geoname_id}/?embed=${encodeURIComponent('city:urban_area/ua:images')}`)
        /** @type {TeleportCity} */
        const location = locationResponse.data
        const coordinates = location.location.latlon
        const weather = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${OPEN_WEATHER_API_KEY}`)
        /** @type {WeatherResponse_} */
        const responseData = {
            weather: weather.data,
            location
        }
        res.end(JSON.stringify(responseData))
    } catch (e) {
        res.end('Error: ' + e)
    }
})

module.exports = app