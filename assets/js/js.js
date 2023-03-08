
const myApp = document.getElementById('myApp');

const api = "https://api.open-meteo.com/v1/forecast?latitude=57.05&longitude=9.92&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=auto"

buildStateOne()

function buildStateOne() {
    myApp.innerHTML = ""

    myApp.classList.add('appStateOne')

    let loadingTitle = document.createElement('h1')
    loadingTitle.innerHTML = "wethr"
    loadingTitle.classList.add('s1LoadingTitle')

    let loadingAnimation = document.createElement('img')
    loadingAnimation.src = "assets/images/svg/loading-svgrepo-com (2).svg"
    loadingAnimation.classList.add('s1LoadingAnimation')

    let loadingText = document.createElement('h2')
    loadingText.innerHTML = "LOADING"
    loadingText.classList.add('s1LoadingText')


    myApp.appendChild(loadingTitle)
    myApp.appendChild(loadingAnimation)
    myApp.appendChild(loadingText)


    let apiTest = fetch(api)
        .then((apiResponse) => {
            return apiResponse.json()
        })
        .then((jsonResponse) => {
            weatherData = jsonResponse
            buildStateTwo(weatherData)
            console.log(apiTest);
        })
        .catch((error) => {
            console.error(error)
        })

};

// `https://api.open-meteo.com/v1/forecast?latitude=${inputLat}&longitude=${inputLong}&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=auto`





let myFakeData = {
    location: "Aalborg",
    status: "assets/images/svg/Icon weather-day-sunny-5.svg",
    temp: "15",
    time: "09:00",
    date: "Mandag 23 januar",
    wind: "2.6",
    rain: "0.3"
}


function buildStateTwo(data) {
    myApp.innerHTML = ""
    document.title = "App"

    let precipitation = data.hourly.precipitation
    let temperature = data.hourly.temperature_2m
    let time = data.hourly.time
    let windDirection = data.hourly.winddirection_10m
    let windSpeed = data.hourly.windspeed_10m

    myApp.classList.replace('appStateOne', 'appStateTwo')

    let fullLocation = document.createElement('div')
    fullLocation.classList.add('s2FullLocation')

    let dayLocation = document.createElement('h1')
    dayLocation.innerHTML = data.timezone
    dayLocation.classList.add('s2DayLocation')
    
    let locationSvg = document.createElement('img')
    locationSvg.classList.add('s2LocationSvg')
    locationSvg.src = "assets/images/svg/location_on_FILL-1.svg"

    let dayStatus = document.createElement('img') //TODO Switch-funktion til status
    dayStatus.src = "assets/images/svg/Icon weather-day-sunny-5.svg"
    dayStatus.classList.add('s2DayStatus')

    let dayTemp = document.createElement('h2')
    dayTemp.innerHTML = `${temperature[0]}°`
    dayTemp.classList.add('s2DayTemp')

    let fullDate = document.createElement('div')
    fullDate.classList.add('s2FullDate')

    let dayTime = document.createElement('h3')
    dayTime.innerHTML = data.hourly.time[0].slice(-5)
    dayTime.classList.add('s2DayTime')

    let dayDate = document.createElement('p')
    dayDate.innerHTML = data.hourly.time[0].slice(0, 10)
    dayDate.classList.add('s2DayDate')


    let WindRainDiv = document.createElement('div')
    WindRainDiv.classList.add('s2WindRainDiv')

    let fullWind = document.createElement('div')
    fullWind.classList.add('s2FullWindRain')
    let dayWind = document.createElement('p')
    dayWind.innerHTML = windSpeed[0]
    dayWind.classList.add('s2DayWindRainP')
    let windMetric = document.createElement('p')
    windMetric.innerHTML = data.hourly_units.windspeed_10m
    windMetric.classList.add('s2WindRainMetric')

    let fullRain = document.createElement('div')
    fullRain.classList.add('s2FullWindRain')
    let dayRain = document.createElement('p')
    dayRain.innerHTML = precipitation[0]
    dayRain.classList.add('s2DayWindRainP')
    let rainMetric = document.createElement('p')
    rainMetric.innerHTML = data.hourly_units.precipitation
    rainMetric.classList.add('s2WindRainMetric')

    myApp.appendChild(fullLocation)
    fullLocation.appendChild(dayLocation)
    fullLocation.appendChild(locationSvg)
    myApp.appendChild(dayTemp)
    myApp.appendChild(dayStatus)
    myApp.appendChild(fullDate)
    fullDate.appendChild(dayTime)
    fullDate.appendChild(dayDate)

    myApp.appendChild(WindRainDiv)
    WindRainDiv.appendChild(fullWind)
    fullWind.appendChild(dayWind)
    fullWind.appendChild(windMetric)
    WindRainDiv.appendChild(fullRain)
    fullRain.appendChild(dayRain)
    fullRain.appendChild(rainMetric)

    
        console.log(data);
    //TODO Returnere et object med flere objects og arrays med data

    //TODO "let dataindex = 0" dataindex skal ændre sig når man swiper


    //* Arrays
};
    // buildNavigationBar()
function buildNavigationBar () {

};