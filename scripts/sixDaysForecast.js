import {convertKmphToMps, convertDateFormat, splitToChunks, getAverage, getMostFrequentElement} from "./helpers.js";

export function createSixDayForecast (days){
    let output = document.getElementById("nextdaysweather")
    output.innerHTML = ''

    for(let i =0; i < days.length; i++) {
        output.innerHTML += `
    <div class="nextdaysweather-wrapper nextdaysweather-wrapper--hidden" data-index="${i}">
    <div class='nextdaysweather__info'>
        <div class="nextdaysweather__date">${convertDateFormat(days[i].datetime, i)}</div>
            <div class='small-weather-icon-wrapper'>
            <img src='./Assets/icons/weather-icons/${days[i].icon}.png'>
        </div>
            <div class='parameter-wrapper'>
            <img class="small-temp-icon" src='./Assets/icons/weather-icons/temperature-icon.svg'>
            <p>${days[i].temp}° <span class='small-text'>- føles som ${days[i].feelslike}°</span></p>
        </div>
        <div class='parameter-wrapper'>
            <img class="small-rain-icon" src='./Assets/icons/weather-icons/rain-icon.svg'>
            <p>${days[i].precip} <span class='small-text'>mm</span></p>
        </div>
        <div class='parameter-wrapper'>
            <img class="wind" src='./Assets/icons/weather-icons/wind-icon.svg'>
            <p>${convertKmphToMps(days[i].windspeed)} <span class='small-text'>m/s</span></p>
        </div>
        <div class="chevron-wrapper chevron-wrapper--rotate-default">
        <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.600098 20L8.6001 12L0.600098 3.99995L2.2001 0.799952L13.4001 12L2.2001 23.2L0.600098 20Z" fill="white"/>
        </svg>
        </div>
    </div>
    <div class="nextdaysweather__expanded-info">${renderExpandedWeatherView(days[i].hours)}</div>
    </div>
    `
    }

    const dayContainers = Array.from(document.getElementsByClassName("nextdaysweather__info"))
    dayContainers.forEach((dayContainer, index) => dayContainer.addEventListener("click", (e) => {
        const chevronIcon = document.querySelector(`[data-index="${index}"] > .nextdaysweather__info > .chevron-wrapper`)
        chevronIcon.classList.toggle('chevron-wrapper--rotate-right')
        chevronIcon.classList.toggle('chevron-wrapper--rotate-default')

        const nextdatsweatherWrapper = document.querySelector(`[data-index="${index}"]`)
        nextdatsweatherWrapper.classList.toggle("nextdaysweather-wrapper--expanded")
        nextdatsweatherWrapper.classList.toggle("nextdaysweather-wrapper--hidden")
    }))
}

const renderSegmentedHoursArray = (hoursArray) => {
    const splitHoursArray = splitToChunks(hoursArray, 6)
    const resultArray = []
    splitHoursArray.forEach((arrayChunk, arrayChunkIndex) => {
        const intervalTemp = []
        const intervalRain = []
        const intervalWindSpeed = []
        const intervalIcon = []
        arrayChunk.forEach(hourArray => {
            intervalTemp.push(hourArray.temp)
            intervalRain.push(hourArray.precip)
            intervalWindSpeed.push(hourArray.windspeed)
            intervalIcon.push(hourArray.icon)
        })
        const resultObject = {
            hoursSegment: getHoursInterval(arrayChunkIndex),
            temp: getAverage(intervalTemp).toFixed(1),
            rain: getAverage(intervalRain).toFixed(2),
            windSpeed: convertKmphToMps(getAverage(intervalWindSpeed)),
            icon: getMostFrequentElement(intervalIcon)
        }
        resultArray.push(resultObject)
    })
        return resultArray
}

const renderExpandedWeatherView = (hoursArray) => {
    const hoursArraySegmented = renderSegmentedHoursArray(hoursArray)
    console.log(hoursArraySegmented)
    let HTMLOutput = ""
    hoursArraySegmented.forEach(segment => {
        HTMLOutput += `
        <div class="hour-segment">
            <p class="hour-segment__time-interval">${segment.hoursSegment}</p>
            <img class="hour-segment__weather-icon" src='./Assets/icons/weather-icons/${segment.icon}.png'>
            <div class="mini-parameter-wrapper">
            <img class="mini-temp-icon" src='./Assets/icons/weather-icons/temperature-icon.svg'>
            <p>${segment.temp}°</p>
            </div>
            <div class="mini-parameter-wrapper">
                <img class="mini-rain-icon" src='./Assets/icons/weather-icons/rain-icon.svg'>
                <p>${segment.rain} mm</p>
            </div>
            <div class="mini-parameter-wrapper">
                <img class="mini-wind-icon" src='./Assets/icons/weather-icons/wind-icon.svg'>
                <p>${segment.windSpeed} m/s</p>
            </div>
        </div>
        `
    })
    return HTMLOutput
}

const getHoursInterval = (index) => {
    switch (index) {
        case 0:
            return '00 - 03'
        case 1:
            return '04 - 07'
        case 2:
            return '08 - 11'
        case 3:
            return '12 - 15'
        case 4:
            return '16 - 19'
        case 5:
            return '20 - 23'
    }
}
