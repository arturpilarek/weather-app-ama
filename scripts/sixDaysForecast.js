import {convertKmphToMps} from "./helpers.js";

export function createSixDayForecast (days){
    let output = document.getElementById("nextdayweather")
    output.innerHTML = ''

    for(let i =0; i < days.length; i++) {
        output.innerHTML += `
    <div class='nextdayweather__info'>
        <div class='icon-wrapper'>
        <img src='./Assets/icons/weather-icons/${days[i].icon}.png'>
    </div>
        <div class='parameter-wrapper'>
        <img src='./Assets/icons/weather-icons/temperature-icon.svg'>
        <p>${days[i].temp}° <span class='small-text'>- føles som ${days[i].feelslike}°</span></p>
    </div>
    <div class='parameter-wrapper'>
        <img src='./Assets/icons/weather-icons/rain-icon.svg'>
        <p>${days[i].precip} <span class='small-text'>mm</span></p>
    </div>
    <div class='parameter-wrapper'>
        <img src='./Assets/icons/weather-icons/wind-icon.svg'>
        <p>${convertKmphToMps(days[i].windspeed)} <span class='small-text'>m/s</span></p>
    </div>
        </div>
    `
    }
}