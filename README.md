# Work Day Planner
Homework #05 - Third-Party APIs: Work Day Scheduler

![html badge](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
![css badge](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
![bootstrap badge](https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white)
![jquery badge](https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white)

http://www.natemking.dev/work_day_planner/

---

## Table of Contents
 * [Description](#description)
    + [Scope of Work](#scope-of-work)
    + [HTML and CSS](#html-and-css)
    + [Javascript functionality](#javascript-functionality)
  * [Screenshots](#screenshots)
  * [Credits](#credits)

## Description

### Scope of Work
The client has requested a simple day planner broken down into business hours. The functionality requested was that the current day/time be displayed live in the header, the ability to save the hourly planned event, color-coding that is dynamic depending on what time of day it is, and the ability to save their entries. 

### HTML and CSS
The initial work came with pre-coded HTML and CSS. The HTML included a pre-built header, a container for the planner time blocks, and CDNs to BootStrap, FontAwesome, jQuery, & Moment.JS libraries. The CSS has pre-built classes outside of the typical BootStrap options. At first, I had started to build the time blocks in HTML but decided to take a more dynamic approach and use JavaScript to have these blocks created as the page loads. More on that in [JavaScript functionality](#JavaScript-functionality). Aside from adding a time block template, a main, a footer (used for design purposes only), and updating the semantics not much of the HTML was altered. 

After completing the JavaScript coding, I decided to take a more creative route and change up the look of the provided page with CSS. I achieved this by, not only, adding my own CSS but by altering the default BootStrap and the pre-built styles the client provided. Lastly, I made sure the site was responsive to mobile.    

### JavaScript Functionality
As stated above, the first major decision I made in the app was to have the time blocks created dynamically at page load. After creating the template and making it `display: none;`, I constructed an array of all the times named `timesArr` that would be in the calendar. I wrote a for loop which uses jQuery's `.clone()` method to create a clone of the template for each of the hours as specified in the `timesArr`. While still in the loop, attributes are added to specific elements before appending to the container. The advantage of choosing this route allows for easier mutability of the time block container. If the client wanted to add more time blocks outside of the nine to five range, it would be as simple as adding those slots to the `timesArr`. 

Next, I tackled the live timekeeping. I chose to forgo the pre-coded Moment.js library for Day.js. As of September 2020, Moment.js is no longer being supported. Between that and the fact that the moment object is mutable led me to choose Day.js. I wanted to future proof my code as best as possible. It was not a hard decision as Day.js' syntax is very similar to Moment.js'. An all-encompassing live-time function called `dateTime()` was created. I used the Day.js library and jQuery to create a live, dynamic date and time in the header. The next challenge was to have the time blocks change color depending on if they were past, present, or future. I had to initialize with a for loop again to iterate through the `timesArr`. Inside the for loop, I created an if-else statement to compare the current hour with the time block hour and change the class as a result. I ran into an issue here with the output of the current time from Day.js and my `timesArr` output both being strings. I running into an issue where the results were not coming out as intended. Also, the `timesArr` is not in twenty-four hour time which leads to major issues with the comparison operators.  To solve this I created a new array that is made up of numbers only and in twenty-four hour time called `euroTimesArr`. I then convert the output from Day.js to an integer and compare it to my array changing the time block classes according to where they are in the day. 

Local storage is the next function to run. Again a for loop is initialized to iterate through the `timesArr`. I created a variable that gets the saved items from local storage then the data that is received is written to its corresponding time block if there is previously stored data. Next, a click event listener calls an if statement that says if there is any value in the time block inputs, write it into the storage `savedEvents` storage object and set that object to local storage. While still in the for loop I added two more event listeners that listen for enter-keydown/mousedown and enter-keyup/mouseup respectively. When the former is activated the FontAwesome icon changes a class and reverts when the latter is activated. This gives the user visual feedback that their entry has been completed. 

This is all the client requested but I added a couple more features. First I added a button to the top of the Main that allows the user to clear their schedule by clearing local storage and refreshing the page on click. Second, I added to the `dateTime()` function a nested function that gets the last stored date the planner was used from local storage and compared it to today's date. If the last stored date is in the past, the local storage is cleared and the current date is then stored. This feature adds simplicity to the user experience.

## Screenshots

<summary><strong>Work Day Planner</strong></summary>
<br>


![workday planner day add entries](./assets/images/screenshots/work_day_planner_add.gif?raw=true)
<br>
_add entries_
<br>

![workday planner clear schedule](./assets/images/screenshots/work_day_planner_clear.gif?raw=true)
<br>
_clear schedule_
<br>

![workday planner hour change](./assets/images/screenshots/work_day_planner_hour_change.gif?raw=true)
<br>
_hour change_
<br>

![workday planner day change](./assets/images/screenshots/work_day_planner_day_change.gif?raw=true)
<br>
_day change_
<br>

## Credits

* [jQuery](https://jquery.com/)

* [day.js](https://day.js.org/)

* [Cloning multiple elements to the DOM with a for loop](https://stackoverflow.com/questions/29837552/jquery-appending-multiple-cloned-dom-objects-using-a-for-loop)

* [Set dynamic time with Moment.js](https://stackoverflow.com/questions/10590461/dynamic-date-and-time-with-moment-js-and-setinterval)

* [Add and Remove classes](https://stackoverflow.com/questions/7002039/easiest-way-to-toggle-2-classes-in-jquery)

* [For/Of loop to create an object from an array](https://stackoverflow.com/questions/42974735/create-object-from-array)

* [Getting multiple values to local storage](https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage)

* [Create a button to clear local storage](https://stackoverflow.com/questions/30816119/how-do-i-clear-localstorage-with-a-button)

* [Event listener for both 'click' & 'keydown'](https://stackoverflow.com/questions/9146651/trigger-an-event-on-click-and-enter)

---

GitHub: [@natemking](https://github.com/natemking/)

Email: [natmeking@gmail.com](mailto:natmeking@gmail.com)