$(document).ready(function () {

    //*** Global Variables ***//
    //------------------//
    const timesArr = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
    const euroTimesArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    //clones the time block tmeplate and append to the DOM for the hours in the timesArr
    const timeBlocks = () => {
        //variable to clone the time-block template
        const $clone = $('.block-template').clone();

        //for loop that iterates through the timesArr for block creation
        for (let i = 0; i < timesArr.length; i++) {
            //variable to create a clone of the clone so each block gets created
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
            //Appends all to the contaiiner
            $($copy).appendTo('.container');

        }
        $('#5pm-block').after('<hr>')
        $('.container').after('<footer>')

    }

    timeBlocks();

    //Display current day & time
    const displayDateTime = () => {
        let now = moment().format('dddd MMMM Do YYYY hh:mm:ss a');
        $('#current-day').html(now);
        setTimeout(function () {displayDateTime(); }, 1000);

        //variable to convert time to integer for comparison
        let timeToInt = parseInt(moment().format('H'))

        // For loop to compare the current time w/ the 24 hour clock times in euroTimesArr
        for (let i = 0; i < euroTimesArr.length; i++) {
            if (timeToInt === euroTimesArr[i]){
                $(`#${timesArr[i]}-input`).removeClass('past future').addClass('present');
            }else if(timeToInt > euroTimesArr[i]){
                $(`#${timesArr[i]}-input`).removeClass('present future').addClass('past');
            }else if (timeToInt < euroTimesArr[i]){
                $(`#${timesArr[i]}-input`).removeClass('present past').addClass('future');
            }
            
        }

    } 
    displayDateTime();
});



