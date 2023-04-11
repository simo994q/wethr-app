
const myApp = document.getElementById('myApp');

const api = "https://api.open-meteo.com/v1/forecast?latitude=57.05&longitude=9.92&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=auto"


let apiTest = fetch(api)
.then((apiResponse) => {
  if (apiResponse.ok == true) {
    return apiResponse.json()
  } else if (apiResponse.ok == false) {
    loadingText.innerHTML = "NO DATA"
  }
})
.then((jsonResponse) => {
  weatherData = jsonResponse
    buildStateTwo(weatherData)
})
.catch((error) => {
  console.error(error)
})

console.log(apiTest);
let arrayOne = []

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




};

// `https://api.open-meteo.com/v1/forecast?latitude=${inputLat}&longitude=${inputLong}&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=auto`





function buildStateTwo(data) {
  myApp.innerHTML = ""
  document.title = "App"

  let currentIndexTime = new Date().getHours()

  let precipitation = data.hourly.precipitation
  let temperature = data.hourly.temperature_2m
  let time = data.hourly.time
  let windDirection = data.hourly.winddirection_10m
  let windSpeed = data.hourly.windspeed_10m

  myApp.classList.replace('appStateOne', 'appStateTwo')

  let fullLocation = document.createElement('div')
  fullLocation.classList.add('s2FullLocation')

  let dayLocation = document.createElement('h1')
  dayLocation.classList.add('s2DayLocation')
  let URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`
  fetch(URL)
  .then((response) => response.json())
  .then((data) => {
      dayLocation.innerHTML = data.address.city
  })
  .catch((error) => {
      console.error('Error:', error);
  });

  let locationSvg = document.createElement('img')
  locationSvg.classList.add('s2LocationSvg')
  locationSvg.src = "assets/images/svg/location_on_FILL-1.svg"

  let dayStatus = document.createElement('img') //TODO Switch-funktion til status
  dayStatus.src = "assets/images/svg/Icon weather-day-sunny-5.svg"
  dayStatus.classList.add('s2DayStatus')

  let dayTemp = document.createElement('h2')
  dayTemp.innerHTML = `${temperature[currentIndexTime]}°`
  dayTemp.classList.add('s2DayTemp')

  let fullDate = document.createElement('div')
  fullDate.classList.add('s2FullDate')

  let dayTime = document.createElement('h3')
  dayTime.innerHTML = time[currentIndexTime].slice(-5)
  dayTime.classList.add('s2DayTime')

  let dayDate = document.createElement('p')
  dayDate.innerHTML = data.hourly.time[currentIndexTime].slice(0, 10)
  dayDate.classList.add('s2DayDate')


  let WindRainDiv = document.createElement('div')
  WindRainDiv.classList.add('s2WindRainDiv')

  let fullWind = document.createElement('div')
  fullWind.classList.add('s2FullWindRain')
  let dayWind = document.createElement('p')
  dayWind.innerHTML = windSpeed[currentIndexTime]
  dayWind.classList.add('s2DayWindRainP')
  let windMetric = document.createElement('p')
  windMetric.innerHTML = data.hourly_units.windspeed_10m
  windMetric.classList.add('s2WindRainMetric')

  let fullRain = document.createElement('div')
  fullRain.classList.add('s2FullWindRain')
  let dayRain = document.createElement('p')
  dayRain.innerHTML = precipitation[currentIndexTime]
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
  buildNavigationBar('navClass1', data)
};


function buildNavigationBar (navClass, data) {
  let fullNavBar = document.createElement('nav')
  fullNavBar.classList.remove('navMainClass', 'navClass1', 'navClass2')
  fullNavBar.classList.add('navMainClass')
  fullNavBar.classList.add(navClass)
  
  let navButtonDaily = document.createElement('button')
  navButtonDaily.innerText = 'I dag'
  navButtonDaily.addEventListener('click', () => buildStateTwo(data))
  
  let navButtonForecast = document.createElement('button')
  navButtonForecast.innerText = 'Oversigt'
  navButtonForecast.addEventListener('click', () => buildStateThree(data))

  myApp.appendChild(fullNavBar)
  fullNavBar.appendChild(navButtonDaily)
  fullNavBar.appendChild(navButtonForecast)
};

function buildStateThree(data) {
  myApp.innerHTML = ''





  buildNavigationBar('navClass2', data)
}



// Location API
getLocation()
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude)
}