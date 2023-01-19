library(httr)
library(dplyr)
library(stringr)
library(jsonlite)

const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

function requestApi(Leiria){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${Leiria}&units=metric&appid=16e9f5fc4cdfb21605bdee8fe57b7ea2`;
    fetchData();
}
function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=16e9f5fc4cdfb21605bdee8fe57b7ea2`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}
function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}
function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}
arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});

function GetInfo() {

  var newName = document.getElementById("cidade");
  var cityName = document.getElementById("cidadeNome");
  cityName.innerHTML = ""+newName.value+"";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=16e9f5fc4cdfb21605bdee8fe57b7ea2')
.then(response => response.json())
.then(data => {

  //Getting the min and max values for each day
  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
      //Number(1.3450001).toFixed(2); // 1.35
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
  }
  //------------------------------------------------------------

  //Getting Weather Icons
   for(i = 0; i<5; i++){
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
      data.list[i].weather[0].icon
      +".png";
  }
  //------------------------------------------------------------
  console.log(data)


})

.catch(err => alert("Something Went Wrong: Try Checking Your Internet Conection"))
}

function DefaultScreen(){
  document.getElementById("cidade").defaultValue = "Cidade";
  GetInfo();
}

var d = new Date();
var weekday = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function CheckDay(day){
  if(day + d.getDay() > 6){
      return day + d.getDay() - 7;
  }
  else{
      return day + d.getDay();
    }
  }

  for(i = 0; i<5; i++){
      document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
  }


let geocode = {
    reverseGeocode: function (latitude, longitude) {
      var apikey = "2cad6041208649f7bacaf9013ad4ec2e";
  
      var api_url = "https://api.opencagedata.com/geocode/v1/json";
  
      var request_url =
        api_url +
        "?" +
        "key=" +
        apikey +
        "&q=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&pretty=1" +
        "&no_annotations=1";
  
      // see full list of required and optional parameters:
      // https://opencagedata.com/api#forward
  
      var request = new XMLHttpRequest();
      request.open("GET", request_url, true);
  
      request.onload = function () {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes
  
        if (request.status == 200) {
          // Success!
          var data = JSON.parse(request.responseText);
          weather.fetchWeather(data.results[0].components.city);
          console.log(data.results[0].components.city)
        } else if (request.status <= 500) {
          // We reached our target server, but it returned an error
  
          console.log("unable to geocode! Response code: " + request.status);
          var data = JSON.parse(request.responseText);
          console.log("error msg: " + data.status.message);
        } else {
          console.log("server error");
        }
      };
  
      request.onerror = function () {
        // There was a connection error of some sort
        console.log("unable to connect to server");
      };
  
      request.send(); // make the request
    },
    getLocation: function() {
      function success (data) {
        geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, console.error);
      }
      else {
        weather.fetchWeather("Leiria");
      }
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  geocode.getLocation();

function login(){

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if(login == "admin" && senha == "admin"){
        alert('Sucesso');
        location.href = "index.html";
    }else{
        alert('Utilizador ou senha incorretos');
    }

}

city_names <- c("Leiria", "Porto", "Faro", "Lisboa", "Braga","Santarém")
api_id<-'16e9f5fc4cdfb21605bdee8fe57b7ea2'
main_df<-data.frame()

for (city_name in city_names){
url<-str_glue("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={api_id}&q={city_name}")
main_df<- bind_rows(main_df,get_weather_forecaset_by_cities(url))
}

get_weather_forecaset_by_cities <- function(url){
    web_content <- httrGET(url)
    web_content <- content(web_content,"text")
    json_data <- fromJSON(web_content, flatten = TRUE)
    df <- as.data.frame(json_data)
return(df)
}

//Favorites function
function AddToFavorites(){
    var city = document.getElementById("cidade").value;
    var fav = document.getElementById("favorites");
    var option = document.createElement("option");
    option.text = city;
    fav.add(option);
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

function toggleTheme() { 
  if (window.localStorage.theme == "dark") { document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    theme.html("Light Mode");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark-theme");
    theme.html("Dark Mode");
  }
}