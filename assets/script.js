var citySearchEl = document.querySelector("#city-search");
var weatherDisplayEl = document.querySelector("#weather-display");
var fiveDaysEl = document.querySelector("#five-days");
var searchButton = document.querySelector("#btn");
var latitude = 32.715736;
var longitude = -117.161087;



getWeatherApi();

getGeoApi();

function getWeatherApi() {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=87e65aeff8380c1792c5b0b66b79ef3d';

    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           console.log(data);     
                var cityEl = document.createElement('a');
                cityEl.classList = 'flex-row justify-space-between align-center';
                cityEl.setAttribute('h5', data.name);
                cityEl.setAttribute('p', data.temp);
                cityEl.setAttribute('p', data.wind);
                cityEl.setAttribute('p', data.humidity);
        
        })
}

function getGeoApi() {

    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=Phoenix&appid=87e65aeff8380c1792c5b0b66b79ef3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
           console.log(data[0].lat);
           console.log(data[0].lon);
           var lat = data[0].lat;
           var lon = data[0].lon;

           var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=87e65aeff8380c1792c5b0b66b79ef3d';

           console.log(requestUrl);
           fetch(requestUrl)
               .then(function (response) {
                   return response.json();
               })
               .then(function (data) {
                  console.log(data);
                 
               })
               // Enter current weather API here

        })
}

function getFiveDaysApi() {

    var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=87e65aeff8380c1792c5b0b66b79ef3d';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
           console.log(data[0].lat);
           console.log(data[0].lon);
           var lat = data[0].lat;
           var lon = data[0].lon;

           var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=87e65aeff8380c1792c5b0b66b79ef3d';

           console.log(requestUrl);
           fetch(requestUrl)
               .then(function (response) {
                   return response.json();
               })
               .then(function (data) {
                  console.log(data);

                  for (var i = 0; i < 5; i++) {
                    var cityEl = document.createElement('a');
                    cityEl.classList = 'flex-row justify-space-between align-center';
                    cityEl.setAttribute('h5', data.name);
                    cityEl.setAttribute('p', data.temp);
                    cityEl.setAttribute('p', data.wind);
                    cityEl.setAttribute('p', data.humidity);
                }
                 
               })
               // Enter current weather API here

        })
}


//searchButton.addEventListener("click", getWeatherApi);

