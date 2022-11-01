const api_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kolding?unitGroup=metric&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json"

const createApiQuery = (location) => {
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=FU7XFQM4A2CKKUUT4JXHP2EX5&contentType=json`
}

async function getApiData(apiUrl) {
    const response = await fetch (apiUrl)
    return await response.json()
}

getApiData(createApiQuery('kolding')).then((res) => console.log(res)).catch(err => console.log(err))