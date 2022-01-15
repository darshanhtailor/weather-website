const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieGVoZW4iLCJhIjoiY2t4c3BheW11MHU5ejJ2bzB4YTBjY295dyJ9.qwrE25e2ZZPJ_30i1vSacg&limit=1`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to reach the geocode server.')
        }
        else if (response.body.features.length == 0) {
            callback(address + ' not found in geocode database.')
        }
        else {
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            callback(null, {
                lat: lat,
                long: long
            })
        }
    })
}

const forecast = (coords, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=555a17fc3d9cf4ff0a1e233b7991b674&query=${coords.lat},${coords.long}`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to collect the weather info.')
        }
        else {
            callback(null, response.body)
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}