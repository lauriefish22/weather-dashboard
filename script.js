var APIkey = "19a8ea7d231d294d32f52b217ae8e55c";
var clear = document.getElementById("clear");
var inputButton = document.getElementById('input-button');
var currentTempEl = document.getElementById('temp');
var currentWindEl = document.getElementById('wind');
var currentHumidity = document.getElementById('humidity');
var city = document.getElementById("search-city");

var date = dayjs().format('dddd MMMM D YYYY   h:mm: a');

var showOldEntries = document.getElementById('old-inputs');
var historyEl = document.getElementById('history');






function getCurrentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        $("#city-name").html("<h2>Currently in " + response.name + ":" + " " + date + "</h2>");
        $("#wind").html("<p>Wind Speed: " + response.wind.speed + "</p>");
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#temp").text("Temperature (F) " + response.main.temp);

    });
}





$("#input-button").on("click", (event) => {
    let newCity = city.value;
    console.log(newCity);
    getCurrentWeather(newCity);
    var searchCity = $("#old-inputs")
    searchCity.attr('id', newCity)
    searchCity.text(newCity)
    searchCity.addClass("h4")
});
//getCurrentWeather();














