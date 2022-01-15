console.log('client side js is loaded')

const fetchWeather = (loc)=>{
    fetch(`http://localhost:3001/weather?address=${loc}`).then((response)=>{
        response.json().then((weatherObject)=>{
            if(weatherObject.error){
                return console.log(weatherObject.error)
            }
            console.log(weatherObject)
        })
    })
}

const form = document.querySelector('form')
const loc = form.querySelector('input')
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    fetchWeather(loc.value)
})