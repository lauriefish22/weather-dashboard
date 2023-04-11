# WEATHER DASHBOARD


-[Live Site](https://lauriefish22.github.io/weather-dashboard/)
-[Github](https://github.com/lauriefish22/weather-dashboard)

## SITE SCREENSHOT
![assets](./Assets/Screenshot%202023-04-10%20at%2010.36.25%20PM.png)

## TECHNOLOGY USED
-[BOOTSTRAP](https://getbootstrap.com/docs/4.0/components/input-group/)
-[JQUERY](https://www.w3schools.com/jquery/)
-[DAYJS](https://day.js.org/docs/en/display/format)
Open Weather API

## DESCRIPTION
My objective was to create a weather dashboard displaying the current conditions as well as the five day forecast for a chosen city.  I used Jquery, Bootstrap and a 3rd party API to show this. 

## LEARNING POINTS
This project was a great way to start getting used to using API's and realize all of the information and possibilities they hold.  It was a challenge but that always means a bigger celebration at the end!



## CODE EXAMPLE
An example of what I thought to be the trickiest part.  Getting parameters to spread across the five day forecast elements.

```switch (dayNumber) 
        case 0:
            htmlString = 'Temperature ' + response.list[i].main.temp;
            htmlString += 'Wind Speed ' + response.list[i].wind.speed;
            htmlString += 'Humidity ' + response.list[i].main.humidity;
            htmlString += '<img src=' + weatherIcon + '></img>';
            document.getElementById("five-day-one").innerHTML = htmlString;
            dayNumber++;
            break;```


 
