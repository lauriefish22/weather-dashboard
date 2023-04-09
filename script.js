var APIkey = "19a8ea7d231d294d32f52b217ae8e55c";


var currentTempEl = document.getElementById('temp');
var currentWindEl = document.getElementById('wind');
var currentHumidity = document.getElementById('humidity');
var city = "Portland";
var date = dayjs().format('dddd MMMM D YYYY   h:mm: a');






function getCurrentWeather(event) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        $(".city-name").html("<h2>Currently in " + response.name + ":" + " " + date + "</h2>");
        $("#wind").html("<p>Wind Speed: " + response.wind.speed + "</p>");
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#temp").text("Temperature (F) " + response.main.temp);

    });




}
getCurrentWeather();














