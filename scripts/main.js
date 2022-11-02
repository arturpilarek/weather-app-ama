const api_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kolding?unitGroup=metric&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json"
const searchInput = document.getElementById("searchInput")

searchInput.addEventListener("keypress", (event) => {
   if  (event.key === 'Enter') {
       console.log("hi")
   }
})

const createSimpleApiQuery = (location) => {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&elements=datetime%2Cname%2Caddress%2Ctemp%2Cfeelslike%2Chumidity%2Csnow%2Cwindspeed%2Cpressure%2Csolarenergy%2Csunrise%2Csunset%2Cconditions%2Cdescription%2Cicon&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json`
}

async function getApiData(apiUrl) {
    const response = await fetch (apiUrl)
    return await response.json()
}

getApiData(createSimpleApiQuery('kolding')).then((res) => console.log(res)).catch(err => console.log(err))