
const myApp = document.getElementById('myApp');

buildStateOne ()

function buildStateOne () {
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


    setTimeout(() => {
        buildStateTwo()
    }, 2000);

};





let myFakeData = {
    location: "Aalborg",
    status: "assets/images/svg/Icon weather-day-sunny-5.svg",
    temp: "15",
    time: "09:00",
    date: "Mandag 23 januar",
    wind: "2.6",
    rain: "0.3"
}


function buildStateTwo () {
    myApp.innerHTML = ""
    document.title = "App"

    myApp.classList.replace('appStateOne', 'appStateTwo')

    let dayLocation = document.createElement('h1')
    dayLocation.innerHTML = `${myFakeData.location}`
    dayLocation.classList.add('s2DayLocation')

    let dayStatus = document.createElement('img')
    dayStatus.src = myFakeData.status    
    dayStatus.classList.add('s2DayStatus')

    let dayTemp = document.createElement('h2')
    dayTemp.innerHTML = `${myFakeData.temp}°`
    dayTemp.classList.add('s2DayTemp')

    let dayTime = document.createElement('h3')
    dayTime.innerHTML = `${myFakeData.time}`
    dayTime.classList.add('s2DayTime')

    let dayDate = document.createElement('p')
    dayDate.innerHTML = `${myFakeData.date}`
    dayDate.classList.add('s2DayDate')

    let dayWind = document.createElement('figure')
    // dayWind.innerHTML = `${myFakeData.wind}`

    let dayRain = document.createElement('figure')
    // dayRain.innerHTML = `${myFakeData.rain}`


    buildNavigationBar()

};
