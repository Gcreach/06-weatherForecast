var citySearchEl = document.querySelector(".city-search");
var weatherDisplayEl = document.querySelector(".weather-display");
var fiveDaysEl = document.querySelector(".five-days");
var searchButton = document.querySelector(".search-button");

function getWeatherApi() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i <data.length; i++) {
                var showWeather = document
            }
        })
}

searchButton.addEventListener('click', getWeatherApi());

