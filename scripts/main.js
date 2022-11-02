import {createBasicWeatherDisplay} from './basicWeatherDisplay.js'

const searchInput = document.getElementById("searchInput")
const searchIcon = document.getElementById("searchIcon")

searchInput.addEventListener("keypress", (event) => {
   if  (event.key === 'Enter') {
        processApiData(searchInput.value)
   }
})

searchIcon.addEventListener("click", () => {
    processApiData(searchInput.value)
})

async function getApiData(apiUrl) {
    const response = await fetch (apiUrl)
    return await response.json()
}

const createSimpleApiQuery = (location) => {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&elements=datetime%2Cname%2Caddress%2Ctemp%2Cfeelslike%2Cdew%2Cprecip%2Csnow%2Cwindspeed%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json`
}

const processApiData = (location) => {
    getApiData(createSimpleApiQuery(location))
        .then((res) => {
            console.log(res)
            createBasicWeatherDisplay(res)
        })
        .catch(err => console.log(err))

    searchInput.value = ""
}


//Get Kolding's data on load, in the future get user's location and display it instead
processApiData('kolding')

const detailsToggleIcon = document.getElementById("detailsToggleIcon")
const modeDescription = document.getElementById("modeDecription")

detailsToggleIcon.addEventListener("click", () => {
    detailsToggleIcon.classList.toggle('header__details-toggle--detailed')
    detailsToggleIcon.classList.toggle('header__details-toggle--simple')
})