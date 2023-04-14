const myApp = document.getElementById("myApp");

buildStateOne();

getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log(
    "Latitude: " +
    position.coords.latitude +
    " Longitude: " +
    position.coords.longitude
  );
  runApp(position)
}

const api =
  "https://api.open-meteo.com/v1/forecast?latitude=57.05&longitude=9.92&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=auto";

function runApp(positionData) {

  let api = `https://api.open-meteo.com/v1/forecast?latitude=${positionData.coords.latitude}&longitude=${positionData.coords.longitude}&hourly=temperature_2m,weathercode,precipitation,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`

  let apiTest = fetch(api)
    .then((apiResponse) => {
      if (apiResponse.ok == true) {
        return apiResponse.json();
      } else if (apiResponse.ok == false) {
        loadingText.innerHTML = "NO DATA";
      }
    })
    .then((jsonResponse) => {
      weatherData = jsonResponse;
      buildStateTwo(weatherData);
    })
    .catch((error) => {
      console.error(error);
    });
};




// console.log(apiTest);
// let arrayOne = [];



function buildStateOne() {
  myApp.innerHTML = "";

  myApp.classList.add("appStateOne");

  let loadingTitle = document.createElement("h1");
  loadingTitle.innerHTML = "wethr";
  loadingTitle.classList.add("s1LoadingTitle");

  let loadingAnimation = document.createElement("img");
  loadingAnimation.src = "assets/images/svg/loading-svgrepo-com (2).svg";
  loadingAnimation.classList.add("s1LoadingAnimation");

  let loadingText = document.createElement("h2");
  loadingText.innerHTML = "LOADING";
  loadingText.classList.add("s1LoadingText");

  myApp.appendChild(loadingTitle);
  myApp.appendChild(loadingAnimation);
  myApp.appendChild(loadingText);
}

// `https://api.open-meteo.com/v1/forecast?latitude=${inputLat}&longitude=${inputLong}&hourly=temperature_2m,precipitation,windspeed_10m,winddirection_10m&windspeed_unit=ms&timezone=auto`

const timeNow = new Date().getHours()

let currentIndexTime = new Date().getHours();
function buildStateTwo(data) {
  myApp.innerHTML = "";
  document.title = "App";
  myApp.classList.replace('appStateThree', 'appStateTwo')


  let precipitation = data.hourly.precipitation;
  let temperature = data.hourly.temperature_2m;
  let time = data.hourly.time;
  let windDirection = data.hourly.winddirection_10m;
  let windSpeed = data.hourly.windspeed_10m;

  myApp.classList.replace("appStateOne", "appStateTwo");

  let fullLocation = document.createElement("div");
  fullLocation.classList.add("s2FullLocation");

  let dayLocation = document.createElement("h1");
  dayLocation.classList.add("s2DayLocation");
  let URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.address.city) {
        dayLocation.innerHTML = data.address.city;
      } else if (data.address.village) {
        dayLocation.innerHTML = data.address.village;
      } else if (data.address.town) {
        dayLocation.innerHTML = data.address.town;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  let locationSvg = document.createElement("img");
  locationSvg.classList.add("s2LocationSvg");
  locationSvg.src = "assets/images/svg/location_on_FILL-1.svg";

  let dayStatus = document.createElement("img"); //TODO Switch-funktion til status
  dayStatus.classList.add("s2DayStatus");
  switch (data.hourly.weathercode[currentIndexTime]) {
    case 0:
      dayStatus.src = "assets/images/svg/Icon weather-day-sunny-5.svg"; //* sunny
      break;
    case 1:
    case 2:
    case 3:
      dayStatus.src = "assets/images/svg/Icon weather-day-cloudy.svg" //* cloudy
      break;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      dayStatus.src = "assets/images/svg/Icon weather-rain-wind.svg" //*rain
  }


  let dayTemp = document.createElement("h2");
  dayTemp.innerHTML = `${Math.round(temperature[currentIndexTime])}°`;
  dayTemp.classList.add("s2DayTemp");

  let fullDate = document.createElement("div");
  fullDate.classList.add("s2FullDate");

  let dayTime = document.createElement("h3");
  dayTime.innerHTML = time[currentIndexTime].slice(-5);
  dayTime.classList.add("s2DayTime");

  let dayDate = document.createElement("p");
  dayDate.innerHTML = data.hourly.time[currentIndexTime].slice(0, 10);
  dayDate.classList.add("s2DayDate");

  let WindRainDiv = document.createElement("div");
  WindRainDiv.classList.add("s2WindRainDiv");

  let fullWind = document.createElement("div");
  fullWind.classList.add("s2FullWindRain");
  let dayWind = document.createElement("p");
  dayWind.innerHTML = windSpeed[currentIndexTime].toFixed(1);
  dayWind.classList.add("s2DayWindRainP");
  let windMetric = document.createElement("p");
  windMetric.innerHTML = data.hourly_units.windspeed_10m;
  windMetric.classList.add("s2WindRainMetric");

  let fullRain = document.createElement("div");
  fullRain.classList.add("s2FullWindRain");
  let dayRain = document.createElement("p");
  dayRain.innerHTML = precipitation[currentIndexTime];
  dayRain.classList.add("s2DayWindRainP");
  let rainMetric = document.createElement("p");
  rainMetric.innerHTML = data.hourly_units.precipitation;
  rainMetric.classList.add("s2WindRainMetric");



  let swipeElement = document.createElement('div')
  swipeElement.classList.add('swipeElement')

  let xDown = null;
  let yDown = null;

  swipeElement.addEventListener("pointerdown", handleTouchStart, false);
  swipeElement.addEventListener("pointermove", handleTouchMove, false);

  function handleTouchStart(evt) {
    xDown = evt.clientX;
    yDown = evt.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    let xUp = evt.clientX;
    let yUp = evt.clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { // horizontal swipe detected
      if (xDiff > 0) {
        console.log("swipe left");
        currentIndexTime++
        // console.log(currentIndexTime);
        buildStateTwo(data)

      } else if (currentIndexTime > timeNow) {
        console.log("swipe right");
        currentIndexTime--
        // console.log(currentIndexTime);
        buildStateTwo(data)
      }
    }
    // reset values
    xDown = null;
    yDown = null;
    xUp = null;
    yUp = null;
  }


  myApp.appendChild(swipeElement)

  myApp.appendChild(fullLocation);
  fullLocation.appendChild(dayLocation);
  fullLocation.appendChild(locationSvg);
  myApp.appendChild(dayTemp);
  myApp.appendChild(dayStatus);
  myApp.appendChild(fullDate);
  fullDate.appendChild(dayTime);
  fullDate.appendChild(dayDate);

  myApp.appendChild(WindRainDiv);
  WindRainDiv.appendChild(fullWind);
  fullWind.appendChild(dayWind);
  fullWind.appendChild(windMetric);
  WindRainDiv.appendChild(fullRain);
  fullRain.appendChild(dayRain);
  fullRain.appendChild(rainMetric);

  console.log(data);
  //TODO Returnere et object med flere objects og arrays med data

  //TODO "let dataindex = 0" dataindex skal ændre sig når man swiper

  buildNavigationBar("navClass1", data);
}


function buildNavigationBar(navClass, data) {
  let fullNavBar = document.createElement("nav");
  fullNavBar.classList.remove("navMainClass", "navClass1", "navClass2");
  fullNavBar.classList.add("navMainClass");
  fullNavBar.classList.add(navClass);

  let navButtonDaily = document.createElement("button");
  navButtonDaily.innerText = "I dag";
  navButtonDaily.addEventListener("click", () => {
    let apiTest = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&hourly=temperature_2m,weathercode,precipitation,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`)
      .then((apiResponse) => {
        if (apiResponse.ok == true) {
          return apiResponse.json();
        } else if (apiResponse.ok == false) {
          loadingText.innerHTML = "NO DATA";
        }
      })
      .then((jsonResponse) => {
        weatherData = jsonResponse;
        buildStateTwo(weatherData);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  let navButtonForecast = document.createElement("button");
  navButtonForecast.innerText = "Oversigt";
  navButtonForecast.addEventListener("click", () => {
    let apiTest2 = fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&daily=weathercode,temperature_2m_max,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto`
    )
      .then((apiResponse) => {
        if (apiResponse.ok == true) {
          return apiResponse.json();
        } else if (apiResponse.ok == false) {
          console.log("NO DATA");
        }
      })
      .then((jsonResponse) => {
        buildStateThree(jsonResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  myApp.appendChild(fullNavBar);
  fullNavBar.appendChild(navButtonDaily);
  fullNavBar.appendChild(navButtonForecast);
}



let fiveDays = [
  "I dag",
  "I morgen",
  new Date().getDay
]



const Xmas95 = new Date("December 25, 1995 23:15:30");
const options = { weekday: "long" };
console.log(new Intl.DateTimeFormat("da-DK", options).format(Xmas95));


function buildStateThree(data) {
  let tempIndex = 0;
  myApp.innerHTML = "";
  myApp.classList.replace('appStateTwo', 'appStateThree')
  console.log(data);

  let s3allDays = document.createElement("div");
  s3allDays.classList.add("s3allDays");
  myApp.appendChild(s3allDays);

  for (let i = 0; i < 5; i++) {
    let s3secondContainer = document.createElement("section");
    s3secondContainer.classList.add("s3secondContainer");
    s3allDays.appendChild(s3secondContainer);

    let dayContainer = document.createElement("div");
    dayContainer.classList.add("s3DayContainer");
    s3secondContainer.appendChild(dayContainer);

    let dropDownArrow = document.createElement("img");
    dropDownArrow.src =
      "assets/images/svg/chevron_right_FILL0_wght400_GRAD0_opsz48.svg";
    dropDownArrow.classList.add("s3dropDownArrow");
    dayContainer.appendChild(dropDownArrow);


    let dropDownBox = document.createElement("section");
    dropDownBox.classList.add("s3dropDownBox");
    s3secondContainer.appendChild(dropDownBox);

    dropDownArrow.addEventListener("click", () => {
      dropDownBox.classList.toggle('showDropdown')
      dropDownArrow.classList.toggle('dropDownArrowRotate')
    });

    for (let i = 0; i < 24; i++) {
      let daySections = document.createElement("div");
      daySections.classList.add("daySections");
      dropDownBox.appendChild(daySections);

      let dropDownTime = document.createElement("p");
      daySections.appendChild(dropDownTime);
      dropDownTime.innerText = data.hourly.time[tempIndex].slice(-5)

      let dropDownStatus = document.createElement("img");
      dropDownStatus.src = imgSwitch(data.hourly.weathercode[tempIndex]);
      daySections.appendChild(dropDownStatus);

      let dropDownTemp = document.createElement("p");
      daySections.appendChild(dropDownTemp);
      dropDownTemp.innerText = `${Math.round(data.hourly.temperature_2m[tempIndex])}°`

      let randomDiv = document.createElement('div')
      daySections.appendChild(randomDiv);

      let dropDownWind = document.createElement("p");
      daySections.appendChild(dropDownWind);
      dropDownWind.innerText = data.hourly.windspeed_10m[tempIndex].toFixed(1)

      let dropDownWindDir = document.createElement("img");
      dropDownWindDir.src = 'assets/images/svg/iconmonstr-arrow-up-alt-lined-240.png'
      daySections.appendChild(dropDownWindDir);
      dropDownWindDir.style.transform = `rotate(${data.hourly.winddirection_10m[tempIndex]}deg)`
      tempIndex++
    }

    let s3fullStatus = document.createElement("figure");
    s3fullStatus.classList.add("s3fullStatus");
    dayContainer.appendChild(s3fullStatus);


    let s3date = document.createElement("p");
    s3date.innerText = dateSwitch(currentDay)[i];
    s3date.classList.add("s3date");
    dayContainer.appendChild(s3date);

    let s3statusContainer = document.createElement("div");
    s3statusContainer.classList.add("s3statusContainer");
    s3fullStatus.appendChild(s3statusContainer);

    let s3statusImg = document.createElement("img");
    s3statusImg.src = imgSwitch(data.daily.weathercode[i]);
    s3statusContainer.appendChild(s3statusImg);
    let s3statusText = document.createElement("p");
    s3statusText.innerText = statusSwitch(data.daily.weathercode[i])
    s3statusContainer.appendChild(s3statusText);

    let s3tempContainer = document.createElement("div");
    s3tempContainer.classList.add("s3tempContainer");
    s3fullStatus.appendChild(s3tempContainer);

    let s3tempValue = document.createElement("p");
    s3tempValue.innerText = Math.round(data.daily.temperature_2m_max[i]);
    s3tempContainer.appendChild(s3tempValue);
    let s3tempText = document.createElement("p");
    s3tempText.innerText = "Temp.";
    s3tempContainer.appendChild(s3tempText);

    let s3windContainer = document.createElement("div");
    s3windContainer.classList.add("s3windContainer");
    s3fullStatus.appendChild(s3windContainer);

    let s3windImg = document.createElement("img");
    s3windImg.src = "assets/images/svg/air_FILL0_wght400_GRAD0_opsz48.svg";
    s3windContainer.appendChild(s3windImg);
    let s3windText = document.createElement("p");
    s3windText.innerText = `${Math.round(data.daily.windspeed_10m_max[i])}m/s`;
    s3windContainer.appendChild(s3windText);
  }

  buildNavigationBar("navClass2", data);
}


const currentDay = new Date().getDay();
const xmas95 = new Date();
const weekday = xmas95.getDay();

console.log(weekday)


function dateSwitch(index) {
  switch (index) {
    case 0:
      return [
        "I dag",
        "I morgen",
        "Onsdag",
        "Torsdag",
        "Fredag"
      ]
    case 1:
      return [
        "I dag",
        "I morgen",
        "Torsdag",
        "Fredag",
        "Lørdag"
      ]
    case 2:
      return [
        "I dag",
        "I morgen",
        "Fredag",
        "Lørdag",
        "Søndag"
      ]
    case 3:
      return [
        "I dag",
        "I morgen",
        "Torsdag",
        "Fredag",
        "Lørdag"
      ]
    case 4:
      return [
        "I dag",
        "I morgen",
        "Torsdag",
        "Fredag",
        "Lørdag"
      ]

  }
};





function imgSwitch(statusIndex) {
  switch (statusIndex) {
    case 0:
      return "assets/images/svg/Icon weather-day-sunny-5.svg"; //* sunny
    case 1:
    case 2:
    case 3:
      return "assets/images/svg/Icon weather-day-cloudy.svg" //* cloudy
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "assets/images/svg/Icon weather-rain-wind.svg" //*rain
  }
};


function statusSwitch(statusIndex) {
  switch (statusIndex) {
    case 0:
      return "Sol"
    case 1:
    case 2:
    case 3:
      return "Skyer"
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "Regn"
  }
};
