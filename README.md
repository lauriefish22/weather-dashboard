# weather-dashboard


-[Live Site]()
-[Github]()

## SITE SCREENSHOT
![assets]()

## TECHNOLOGY USED
-[HTML](https://www.w3schools.com/js/js_htmldom_navigation.asp)
-[JQUERY](https://www.w3schools.com/jquery/)
-[DAYJS](https://day.js.org/docs/en/display/format)

## DESCRIPTION
My objective was to create a planner for a work day that is broken down by the hour.  The color of each time slot will be different depending on if the hour is current or in the future with the time slots in the past disappearing after the time has passed.  The user will be able to write in tasks and these tasks will be saved to local storage. 

## LEARNING POINTS
This project incorporated dayjs as well as jquery.  Both are great tools to make things connect easily as well as providing pre-made code.  This was also a great opportunity to continue practicing using local storage as well as a different way to use event listeners within jquery. 



## CODE EXAMPLE
This is a great example of using jquery to grab DOM elements through traversing.

```$('.saveBtn').on('click', function () {
  console.log(this);
  var text = $(this).siblings('.description').val();
  var time = $(this).parent().attr('id');

  localStorage.setItem(time, text);
});```


 
