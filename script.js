var APIkey = "19a8ea7d231d294d32f52b217ae8e55c";
var clear = document.getElementById("clear");
var inputButton = document.getElementById('input-button');
var currentTempEl = document.getElementById('temp');
var currentWindEl = document.getElementById('wind');
var currentHumidity = document.getElementById('humidity');
var city = document.getElementById("search-city");
//var city = "portland";
var date = dayjs().format('dddd MMMM D YYYY   h:mm: a');
let stringList = JSON.parse(localStorage.getItem("stringList")) || [];
var showOldEntries = document.getElementById('old-inputs');
var historyEl = document.getElementById('history');


var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}




function getCurrentWeather() {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&units=imperial&appid=" + APIkey;

    fetch(queryURL)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(queryURL);
            console.log(response);

            $("#city-name").html("<h2>Currently in " + response.name + ":" + " " + date + "</h2>");
            $("#wind").html("<p>Wind Speed: " + response.wind.speed + "</p>");
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#temp").text("Temperature (F) " + response.main.temp);

        });
}
function addCity() {
    let newCity = city.value;
    var searchCity = $("<li></li>");
    searchCity.attr('id', newCity)
    searchCity.text(newCity)
    searchCity.addClass("h4")
    $("#previous-cities").append(searchCity);

}
function getFiveDayForecast(event) {
    let newCity = city.value;
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
        .then(handleErrors)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(queryURL);
            console.log(response.list);

            let forecastBox = document.querySelectorAll(".forecast");
            let dayNumber = 0;
            for (i = 0; i < response.list.length; i++) {
                let dayData = response.list[i];
                let dayTimeUTC = dayData.dt;
                let timeZoneOffset = response.city.timezone;
                let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
                let thisMoment = moment.unix(dayTimeUTC).utc().utcOffset(timeZoneOffsetHours);

                //console.log(thisMoment);
                if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                    switch (dayNumber) {
                        case 0:

                            let htmlString = 'Temperature ' + response.list[i].main.temp;

                            htmlString += '      Wind Speed ' + response.list[i].wind.speed;
                            htmlString += 'Humidity ' + response.list[i].main.humidity;
                            htmlString += response.list[i].weatherIcon;



                            // htmlString += 'Wind Speed' + response.list[i].wind.speed;
                            // htmlString += 'Humidity' + response.list[i].main.humidity;
                            // htmlString += response.list[i].weather.icon;

                            document.getElementById("five-day-one").innerHTML = htmlString;
                    }
                }
            }
        })
}


$("#input-button").on("click", (event) => {
    let newCity = city.value;
    console.log(newCity);

    getCurrentWeather();

    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&appid=" + APIkey;

    // let searchCity = $("#old-inputs")
    // searchCity.attr('id', newCity)
    // searchCity.text(newCity)
    // searchCity.addClass("h4")
    // $("#list-group").append(searchCity);
    localStorage.setItem(newCity, queryURL);


    getFiveDayForecast();
    addCity();
});














