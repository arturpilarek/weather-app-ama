import { convertKmphToMps } from './helpers.js'

export function createBasicWeatherDisplay (weather) {
    let output = document.getElementById('current-weather')
    let currentWeather = weather.currentConditions
    let cityName = weather.resolvedAddress.split(', ')

    output.innerHTML = `
        <img src='./Assets/icons/weather-icons/${currentWeather.icon}.png'>
        <div class='current-weather__info'>
            <div class="city-wrapper">
                <h2>${cityName[0].toUpperCase()}</h2>
                <span>${cityName[1]} ${cityName[2] ? ', ' + cityName[2] : ''}</span>
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
}