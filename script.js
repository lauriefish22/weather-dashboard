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


var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
// clearing printed list
function printPreviousCities() {

    let currentListEl = document.getElementsByClassName('list-city');
    for (let i = 0; i < currentListEl.length; i++) {
        document.getElementById('previous-cities').removeChild(currentListEl[i]);
    }

    for (let i = 0; i < localStorage.length; i++) {
        let cityButton = document.createElement('button');
        let listEl = document.getElementById("previous-cities");
        listEl.className = 'list-city';
        let newListItem = document.createElement('li');
        cityButton.value = "" + localStorage.key(i);
        newListItem.append(cityButton);
        listEl.append(newListItem);
        if (localStorage.length > 0) {
            $("#clear").html($('<a id="clear" href="#">clear</a>'));

        } else {
            $("#clear").html("");
        }
    }
}
function clearStorage() {
    let currentListEl = document.getElementById('previous-cities').children;
    for (let i = 0; i < currentListEl.length; i++) {


        document.getElementById('previous-cities').removeChild(currentListEl[i]);
        $('#previous-cities').empty();
    }
    localStorage.clear();
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
function addCity(newCity) {
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&appid=" + APIkey;

    var searchCity = $(("<li></li>"));
    searchCity.attr('id', newCity);
    searchCity.text(newCity);
    searchCity.addClass("h4");
    $("#previous-cities").append(searchCity);
    localStorage.setItem(newCity, queryURL);
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
                let weatherIcon = "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                let htmlString = "";
                if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                    switch (dayNumber) {
                        case 0:
                            htmlString = 'Temperature ' + response.list[i].main.temp;
                            htmlString += 'Wind Speed ' + response.list[i].wind.speed;
                            htmlString += 'Humidity ' + response.list[i].main.humidity;
                            htmlString += '<img src=' + weatherIcon + '></img>';
                            document.getElementById("five-day-one").innerHTML = htmlString;
                            dayNumber++;
                            break;
                        case 1:
                            htmlString = 'Temperature ' + response.list[i].main.temp;
                            htmlString += 'Wind Speed ' + response.list[i].wind.speed;
                            htmlString += 'Humidity ' + response.list[i].main.humidity;
                            htmlString += '<img src=' + weatherIcon + '></img>';
                            document.getElementById("five-day-two").innerHTML = htmlString;
                            dayNumber++;
                            break;
                        case 2:
                            htmlString = 'Temperature ' + response.list[i].main.temp;
                            htmlString += 'Wind Speed ' + response.list[i].wind.speed;
                            htmlString += 'Humidity ' + response.list[i].main.humidity;
                            htmlString += '<img src=' + weatherIcon + '></img>';
                            document.getElementById("five-day-three").innerHTML = htmlString;
                            dayNumber++;
                            break;
                        case 3:
                            htmlString = 'Temperature ' + response.list[i].main.temp;
                            htmlString += 'Wind Speed ' + response.list[i].wind.speed;
                            htmlString += 'Humidity ' + response.list[i].main.humidity;
                            htmlString += '<img src=' + weatherIcon + '></img>';
                            document.getElementById("five-day-four").innerHTML = htmlString;
                            dayNumber++;
                            break;
                        case 4:
                            htmlString = 'Temperature ' + response.list[i].main.temp;
                            htmlString += 'Wind Speed ' + response.list[i].wind.speed;
                            htmlString += 'Humidity ' + response.list[i].main.humidity;
                            htmlString += '<img src=' + weatherIcon + '></img>';
                            document.getElementById("five-day-five").innerHTML = htmlString;
                            dayNumber++;
                            break;
                    }
                }
            }
        });
}


$("#input-button").on("click", (event) => {
    event.preventDefault();
    let newCity = city.value;
    addCity(newCity);
    console.log(newCity);
    getCurrentWeather();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city.value + "&units=imperial&appid=" + APIkey;
    getFiveDayForecast();
});

$("#clear").on("click", (event) => {
    clearStorage();
});

printPreviousCities();










