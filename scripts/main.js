const api_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kolding?unitGroup=metric&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json"
const searchInput = document.getElementById("searchInput")

searchInput.addEventListener("keypress", (event) => {
   if  (event.key === 'Enter') {
       console.log("hi")
   }
})

const createSimpleApiQuery = (location) => {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&elements=datetime%2Cname%2Caddress%2Ctemp%2Cfeelslike%2Cdew%2Cprecip%2Csnow%2Cwindspeed%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json`
}

async function getApiData(apiUrl) {
    const response = await fetch (apiUrl)
    return await response.json()
}

function convertKmphToMps (kmph) {
    return (0.277778 * kmph).toFixed(1)
}

function createBasicWeatherDisplay (weather) {
    let output = document.getElementById('current-weather')
    let currentWeather = weather.currentConditions
    let cityName = weather.resolvedAddress.split(', ')

    output.innerHTML = `
        <img src='./Assets/icons/weather-icons/${currentWeather.icon}.png'>
        <div class='current-weather__info'>
            <div class="city-wrapper">
                <h2>${cityName[0].toUpperCase()}</h2>
                <span>${cityName[1]}, ${cityName[2]}</span>
            </div>
            <p class="now">Lige nu:</p>
            <div class='parameter-wrapper'>
                <img src='./Assets/icons/weather-icons/temperature-icon.svg'>
                <p>${currentWeather.temp}° <span class='small-text'>- føles som ${currentWeather.feelslike}°</span></p>
            </div>
            <div class='parameter-wrapper'>
                <img src='./Assets/icons/weather-icons/rain-icon.svg'>
                <p>${currentWeather.precip} <span class='small-text'>mm</span></p>
            </div>
            <div class='parameter-wrapper'>
                <img src='./Assets/icons/weather-icons/wind-icon.svg'>
                <p>${convertKmphToMps(currentWeather.windspeed)} <span class='small-text'>m/s</span></p>
            </div>
        </div>
        `
    

    console.log(currentWeather)
}

getApiData(createSimpleApiQuery('kolding'))
    .then((res) => {
        console.log(res)
        createBasicWeatherDisplay(res)
    })
    .catch(err => console.log(err))