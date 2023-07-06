var citySearchEl = document.querySelector("#city-search");
var weatherDisplayEl = document.querySelector("#weather-display");
var fiveDaysEl = document.querySelector("#five-days");
var searchButton = document.querySelector("#btn");
var latitude = 32.715736;
var longitude = -117.161087;
var searchTermEl = document.querySelector(".search-term");
var searchList = JSON.parse(localStorage.getItem('city')) || [];

console.log(searchList.length);

loadSearch();

function readLocalStorage() {
    var city = localStorage.getItem('city');

    if(city) {
        city = JSON.parse(city);
    }
    else {
        city = [];
    }
    return city;

}
readLocalStorage();

function saveToStorage(city) {
    var searchTerm = city;
    if (searchList.includes(searchTerm)) {
        return;
    }
    searchList.push(searchTerm);
    localStorage.setItem('city', JSON.stringify(searchList));
    loadSearch();
}

function loadSearch() {

    searchTermEl.innerHTML = "";
    //if (searchList) {
    for (var i = 0; i < searchList.length; i++) {
        //button for the search items
      var srchBtn = $(`<button class="btn btn-primary btn-lg" id="button-${i}" type="button"></button>`).text(searchList[i]).attr("onclick", "getSearch('" + searchList[i] + "')").appendTo(searchTermEl);
      // $(`button-${i}`).on("click", getSearch(searchList[i]));
       console.log(searchList[i]);
    }
    
//}
}

function getSearch (item) {
    getGeoApi(item);
}


function getWeatherApi(lat, lon) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=87e65aeff8380c1792c5b0b66b79ef3d&units=imperial';

    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
          displayWeather(data);
        })
}


function getGeoApi(cityName) {

    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=87e65aeff8380c1792c5b0b66b79ef3d';

    saveToStorage(cityName);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           var lat = data[0].lat;
           var lon = data[0].lon;

           getWeatherApi(lat, lon);
           getFiveDaysApi(lat, lon);

        })
}

function displayWeather(weatherData) {
    var cityNameEl = document.getElementById("city");
    var imageEl = document.getElementById("image");
    var tempEl = document.getElementById("temp");
    var windEl = document.getElementById("wind");
    var humidityEl = document.getElementById("humidity");

    cityNameEl.textContent = weatherData.name;
    imageEl.setAttribute('src', "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png")
    tempEl.textContent = "Temp: " + weatherData.main.temp + "\u00b0";
    windEl.textContent = "Wind: " + weatherData.wind.speed + "mph";
    humidityEl.textContent = "Humidity: " + weatherData.main.humidity + "%";
}

function getFiveDaysApi(lat, lon) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=87e65aeff8380c1792c5b0b66b79ef3d&units=imperial';


    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayFiveDay(data.list);
        })
}

function displayFiveDay(weatherData) {
    var forecastArray = [];

    for (var i = 7; i < weatherData.length; i += 8) {
        forecastArray.push(weatherData[i]);
    }
    console.log(forecastArray);
    var forecastEl = document.getElementsByClassName("forecast");
    for (var i = 0; i < forecastEl.length; i++) {
        console.log(forecastEl[i].children[0])
        console.log(forecastArray[i]);
        forecastEl[i].children[0].textContent = "Date: " + forecastArray[i].dt_txt;
        forecastEl[i].children[1].setAttribute('src', "https://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + "@2x.png")
        forecastEl[i].children[2].textContent = "Temp: " + forecastArray[i].main.temp + "\u00b0";
        forecastEl[i].children[3].textContent = "Wind: " + forecastArray[i].wind.speed + "mph";
        forecastEl[i].children[4].textContent = "Humidity: " + forecastArray[i].main.humidity+ "%" ;
    }
}


searchButton.addEventListener("click", function () {

    var searchInput = document.getElementById("search");
    getGeoApi(searchInput.value);
    searchInput.value = "";
    
});




