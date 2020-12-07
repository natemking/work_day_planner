$(document).ready(function () {

    //*** Global Variables ***//
    //------------------------//

    const timesArr = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
    const euroTimesArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
   
    
    //*** Create and append elements to the DOM ***//
    //---------------------------------------------//

    //Clones the time block template and appends them to the DOM. One for each index of timesArr
    const timeBlocks = () => {
        //Variable to clone the time-block template
        const $clone = $('.block-template').clone();

        //For loop that iterates through the timesArr for block creation
        for (let i = 0; i < timesArr.length; i++) {
            //Variable to create a clone of the clone so each block gets created
            const $copy = $clone.clone();
            //Time blocks - makes the clones visible & adds ids
            $copy.css('display', 'flex')
            $copy.attr('id', `${timesArr[i]}-block`);
            //Hours block - adds the time
            $('.hour-text', $copy).text(`${timesArr[i]}`);
            //User-input - creates ids, value, aria-labels, aria-describedbys
            $('.user-input', $copy).attr({
                id: `${timesArr[i]}-input`,
                'aria-label': `${timesArr[i]}-plans`,
                'aria-describedby': `${timesArr[i]}-plans`
            });
            //Save button - creates ids & aria-labels
            $('.save-btn', $copy).attr({
                id: `${timesArr[i]}-btn`,
                'aria-label': `${timesArr[i]}-button`,
            });
            //FA icon - creates ids
            $('.fa-save', $copy).attr('id', `${timesArr[i]}-save-icon`);
            //Appends all of the above elements to the container
            $($copy).appendTo('.container');
        }
    }
    //Call function to style the page
    timeBlocks();


    //*** Time functionality ***//
    //--------------------------//

    const dateTime = () => {
        //Display current day/time and write to header
        let now = dayjs().format('ddd MMM D YYYY h:mm:ss a');
        $('#current-day').text(now);
        setTimeout(function () {dateTime(); }, 1000);

        //DOM manipulation by time of day
        //Variable to convert time to integer for comparison to the euroTimesArr indexes
        let timeToInt = parseInt(dayjs().format('H'));
        // For loop to compare the current time w/ the 24 hour clock times in euroTimesArr and change the time block color accordingly
        for (let i = 0; i < euroTimesArr.length; i++) {
            if (timeToInt === euroTimesArr[i]){
                $(`#${timesArr[i]}-input`).removeClass('past future').addClass('present');
            }else if(timeToInt > euroTimesArr[i]){
                $(`#${timesArr[i]}-input`).removeClass('present future').addClass('past');
            }else if (timeToInt < euroTimesArr[i]){
                $(`#${timesArr[i]}-input`).removeClass('present past').addClass('future');
            }  
        }

        //Function to check date & if data was from previous day, clear local stor & refresh
        //variable to format date as a number
        let date = parseInt(dayjs().format('YYYYMMDD'));
        const checkDate = () => {
            //gets last stored date integer from local stor
            let day = JSON.parse(localStorage.getItem('date'));
            if (day === null){
                day = [];
            }
            //if lasted stored date < current date clear local stor & refresh. First if is to top 2 reloads from happening when the clear schedule button is clicked by the user
            if (day === date || day === []){}
            else if (day < date){
                localStorage.clear();
                location.reload();
            }
            //Set current date to local stor
            localStorage.setItem('date', date);
        }
        //Call function to check date
        checkDate();
    } 
    //Call function to activate time functionality 
    dateTime();

    //*** Local stor and DOM manipulation via event listeners ***//
    //--------------------------------------------------------------//

    //For loop to iterate through timesArr 
    for (let i = 0; i < timesArr.length; i++) {
        //Get local stor of savedEvents
        let getEvents = JSON.parse(localStorage.getItem('saved-events'));
        if (getEvents === null){
            getEvents = [];
        }
        //Write whats in local stor to its respective input element
        $(`#${timesArr[i]}-input`).text(getEvents[timesArr[i]]);
        
        //Event listener for clicking the save button and save the text in the user input field to local stor
        $(`#${timesArr[i]}-btn`).on('click', function(){
            if(this.id === `${timesArr[i]}-btn`){
                savedEvents[`${timesArr[i]}`] = $(`#${timesArr[i]}-input`).val();
                //Save savedEvents obj to local stor
                localStorage.setItem('saved-events', JSON.stringify(savedEvents));
            } 
        });

         //Event listeners to change the icon class on enter key down/up & mouse down/up
         $(`#${timesArr[i]}-btn`).on('keydown mousedown',function(e){
             if (e.which === 13 || e.type === 'mousedown'){
                $(`#${timesArr[i]}-save-icon`).removeClass('no-click').addClass('click');
             }
        });
        $(`#${timesArr[i]}-btn`).on('keyup mouseup',function(e){
            if (e.which === 13 || e.type === 'mouseup'){
                $(`#${timesArr[i]}-save-icon`).removeClass('click').addClass('no-click');
            }
        });
    }   
    
    //Object for local stor
    const savedEvents = {};
    for (const key of timesArr){
         savedEvents[key] = $(`#${key}-input`).val();
    }
    
    //Click Clear button to erase local stor and refresh page
    $('#clear-btn').click(() => {
        localStorage.clear();
        location.reload();
    });
});



