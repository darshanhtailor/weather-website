const path = require('path')
const weather = require('./weather')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.get('/', (req, res)=>{
    res.render('index',{
        title: 'weather boi',
        name: 'darshan'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message: 'This is the help page. Good Evening!',
        name: 'darshan'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        name: 'Darshan Tailor'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'You must provide the address.'
        })
        return
    }
    weather.geocode(req.query.address, (error, coords)=>{
        if(error){
            res.send({
                error: error
            })
            return
        }
        weather.forecast(coords, (error, weatherData)=>{
            if(error){
                res.send({
                    error:error
                })
            }
            else{
                res.send(weatherData)
            }
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404error',{
        errorMessage: 'Help page not found',
        name: 'darshan tailor'
    })
})

app.get('*', (req, res)=>{
    res.render('404error',{
        errorMessage: 'Error 404 - Page not found',
        name: 'darshan tailor'
    })
})

app.listen(port, ()=>{
    console.log('Server started')
})