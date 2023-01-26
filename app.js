//Forecast Cidade Leiria
const api = '16e9f5fc4cdfb21605bdee8fe57b7ea2'
const city1 = 'Leiria'
const api_link1 = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${api}&units=metric`

fetch(api_link1)
  .then(res => res.json())
  .then(data => {
    const { weather, main } = data
    console.log(weather)
    document.getElementById('location1').innerText = city1
    document.getElementById('date1').innerText = dateBuilder(d)
    document.getElementById('icon1').src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    document.getElementById('temperature1').innerHTML = `${main.temp}&#176;C`
  })

//Forecast Cidade Porto
const city2 = 'Porto'
const api_link2 = `https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${api}&units=metric`
fetch(api_link2)
  .then(res => res.json())
  .then(data2 => {
    const { weather, main } = data2
    console.log(weather)
    document.getElementById('location2').innerText = city2
    document.getElementById('date2').innerText = dateBuilder(d)
    document.getElementById('icon2').src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    document.getElementById('temperature2').innerHTML = `${main.temp}&#176;C`
  })  

//Forecast Cidade Faro
const city3 = 'Faro'
const api_link3 = `https://api.openweathermap.org/data/2.5/weather?q=${city3}&appid=${api}&units=metric`
fetch(api_link3)
  .then(res => res.json())
  .then(data3 => {
    const { weather, main } = data3
    console.log(weather)
    document.getElementById('location3').innerText = city3
    document.getElementById('date3').innerText = dateBuilder(d)
    document.getElementById('icon3').src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    document.getElementById('temperature3').innerHTML = `${main.temp}&#176;C`
  })  

//Forecast Cidade Lisboa
const city4 = 'Lisboa'
const api_link4 = `https://api.openweathermap.org/data/2.5/weather?q=${city4}&appid=${api}&units=metric`
fetch(api_link4)
  .then(res => res.json())
  .then(data4 => {
    const { weather, main } = data4
    console.log(weather)
    document.getElementById('location4').innerText = city4
    document.getElementById('date4').innerText = dateBuilder(d)
    document.getElementById('icon4').src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    document.getElementById('temperature4').innerHTML = `${main.temp}&#176;C`
  })  

//Forecast Cidade Braga
const city5 = 'Braga'
const api_link5 = `https://api.openweathermap.org/data/2.5/weather?q=${city5}&appid=${api}&units=metric`
fetch(api_link5)
  .then(res => res.json())
  .then(data5 => {
    const { weather, main } = data5
    console.log(weather)
    document.getElementById('location5').innerText = city5
    document.getElementById('date5').innerText = dateBuilder(d)
    document.getElementById('icon5').src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    document.getElementById('temperature5').innerHTML = `${main.temp}&#176;C`
  })  

//Forecast Cidade Santarém
const city6 = 'Coimbra'
const api_link6 = `https://api.openweathermap.org/data/2.5/weather?q=${city6}&appid=${api}&units=metric`
fetch(api_link6)
  .then(res => res.json())
  .then(data6 => {
    const { weather, main } = data6
    console.log(weather)
    document.getElementById('location6').innerText = city6
    document.getElementById('date6').innerText = dateBuilder(d)
    document.getElementById('icon6').src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    document.getElementById('temperature6').innerHTML = `${main.temp}&#176;C`
  })  

function dateBuilder(d) {
  let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function GetInfo() {

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "" + newName.value + "";

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=16e9f5fc4cdfb21605bdee8fe57b7ea2')
    .then(response => response.json())
    .then(data => {

      //Getting the min and max values for each day
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
        //Number(1.3450001).toFixed(2); // 1.35
      }

      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
      }
      //------------------------------------------------------------

      //Getting Weather Icons
      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon
          + ".png";
      }
      //------------------------------------------------------------
      console.log(data)


    })

    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Conection"))
}

function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Cidade";
  GetInfo();
}


//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  }
  else {
    return day + d.getDay();
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

//Function to add a city to the favorites list
function AddToFavorites() {
  var city = document.getElementById("cidade").value;
  var fav = document.getElementById("favorites");
  var option = document.createElement("option");
  option.text = city;
  fav.add(option);
}

//Function to remove a city from the favorites list
function RemoveFromFavorites() {
  var fav = document.getElementById("favorites");
  fav.remove(fav.selectedIndex);
}

const country = document.getElementById("country");
const timeZone = document.getElementById("timeZone");
const coords = document.querySelector(".coord").querySelectorAll("p");
const weatherType = document.getElementById("weatherType");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.querySelector(".temp").querySelectorAll("p");
const visibility = document.getElementById("visibility");
const wind = document.querySelector(".wind").querySelectorAll("p");
const clouds = document.getElementById("clouds");
const weatherImg = document.getElementById("weatherImg");

function getData(location) {
  let loc = "Leiria";
  loc = location;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      coords[0].textContent = `Longitude : ${data.coord.lon}`;
      coords[1].textContent = `Latitude : ${data.coord.lat}`;
      weatherType.textContent = `Weather type : ${data.weather[0].main}`;
      weatherDesc.textContent = `Weather description : ${data.weather[0].description}`;
      weatherImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temp[0].textContent = `Original Temperature : ${ktc(data.main.temp)}`;
      temp[1].textContent = `But it feels like ${ktc(data.main.feels_like)}`;
      temp[2].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      temp[3].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      temp[4].textContent = `Pressure : ${data.main.pressure}`;
      temp[5].textContent = `Humidity : ${data.main.humidity}`;
      wind[0].textContent = `Wind speed : ${data.wind.speed}`;
    }

    xhr.send();
  }
}

function ktc(k) {
  k = (k - 273.15);
  return k.toFixed(2);
}

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
  unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "16e9f5fc4cdfb21605bdee8fe57b7ea2";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius"
  }
});

function Toggle1() {

  var btnvar1 = document.getElementById('btnh1');

  if (btnvar1.style.color == "red") {
    btnvar1.style.color = "grey"
  }
  else {
    btnvar1.style.color = "red"
  }
}

  //------------------------------------------------------------


/*
document.getElementById("day1Min").innerHTML = Math.round(data.list[0].main.temp_min - 273.15, -2);
document.getElementById("day2Min").innerHTML = Math.round(data.list[1].main.temp_min - 273.15, -2);
document.getElementById("day3Min").innerHTML = Math.round(data.list[2].main.temp_min - 273.15, -2);
document.getElementById("day4Min").innerHTML = Math.round(data.list[3].main.temp_min - 273.15, -2);
document.getElementById("day5Min").innerHTML = Math.round(data.list[4].main.temp_min - 273.15, -2);*/

/*document.getElementById("day1Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day2Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day3Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day4Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day5Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);*/

/*document.getElementById("img1").src = "http://openweathermap.org/img/w/"+
data.list[0].weather[0].icon
+".png";
document.getElementById("img2").src = "http://openweathermap.org/img/w/"+
data.list[1].weather[0].icon
+".png";
document.getElementById("img3").src = "http://openweathermap.org/img/w/"+
data.list[2].weather[0].icon
+".png";
document.getElementById("img4").src = "http://openweathermap.org/img/w/"+
data.list[3].weather[0].icon
+".png";
document.getElementById("img5").src = "http://openweathermap.org/img/w/"+
data.list[4].weather[0].icon
+".png";*/

/*
document.getElementById("day1").innerHTML = weekday[CheckDay(0)];
document.getElementById("day2").innerHTML = weekday[CheckDay(1)];
document.getElementById("day3").innerHTML = weekday[CheckDay(2)];
document.getElementById("day4").innerHTML = weekday[CheckDay(3)];
document.getElementById("day5").innerHTML = weekday[CheckDay(4)];*/

/*weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";*/