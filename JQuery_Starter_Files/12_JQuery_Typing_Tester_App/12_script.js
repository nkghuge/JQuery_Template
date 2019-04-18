let timer = 0;
let timerRunning = false;
let minutes = 0;
let seconds = 0;
let milliSeconds = 0;
let interval = 0;
let textArray = ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem culpa,',
    'deleniti fugit labore laudantium nobis odit porro praesentium quasi quia sapiente ',
    'sed suscipit tempore ut? Dignissimos eos molestiae nihil pariatur temporibus. Animi',
    'cumque doloremque eligendi, facere obcaecati optio perferendis voluptatum. ',
    'Accusamus accusantium ad, assumenda, eius et fugiat inventore ipsam maxime minima ',
    'minus nesciunt optio provident quisquam quod saepe sed suscipit totam. Accusantium',
    'consectetur dolorem ducimus earum iste laborum molestias porro tempora. A amet,',
    'animi, consectetur cumque dolore exercitationem explicabo ipsa iure maiores odit',
    'perspiciatis provident quisquam quod ratione repellendus saepe tempora vel veniam ',
    'quisquam quod ratione repellendus saepe tempora vel veniam voluptas voluptatum! Labore obcaecati sequi veniam.',
    'tempore ut? Dignissimos eos molestiae nihil pariatur temporibus. Animi cumque doloremque eligendi'];

// Key up event for Text Area
$('#text-area').keyup(function() {
    let textEnteredLength = $(this).val().length;
    let originalText = $('#original-text').text();
    let textEntered = $(this).val();
    let partialText = originalText.substr(0,textEntered.length);
    callTimer(textEnteredLength);
    evaluateText(originalText,textEntered,partialText);
});

// Reset Button Functionality
$('#reset-button').click(function() {
    // Clear the Timer
    clearInterval(interval);
    clearFields();
    $('#text-area').val('');
    $('#message-card').removeClass('bg-success').removeClass('bg-primary').removeClass('bg-danger').addClass('bg-light');
    $('#message').text('');
    $('#minutes').text('00');
    $('#seconds').text('00');
    $('#m-seconds').text('00');
    generateRandomText();
});

// Evaluate Text
let evaluateText = (originalText,textEntered,partialText) => {
    if(textEntered === ''){
        // gray
        $('#message-card').removeClass('bg-success').removeClass('bg-primary').removeClass('bg-danger').addClass('bg-light');
        $('#message').text('');
    }
    else{
        if(textEntered === originalText){
            // green
            $('#message-card').removeClass('bg-light').removeClass('bg-primary').removeClass('bg-danger').addClass('bg-success');
            $('#message').text('Congratulations!');
            // stop the timer
            clearInterval(interval);
            $('#congrats-sound').trigger('play');
            displayModal();
        }
        else{
            if(textEntered === partialText){
                // blue
                $('#message-card').removeClass('bg-light').removeClass('bg-success').removeClass('bg-danger').addClass('bg-primary');
                $('#message').text('Correct!');
            }
            else{
                // red
                $('#message-card').removeClass('bg-light').removeClass('bg-primary').removeClass('bg-success').addClass('bg-danger');
                $('#message').text('Wrong!');
                // Clap Sound
                $('#clap-sound').trigger('play');
            }
        }
    }

};


// Call Timer
let callTimer = (textEnteredLength) => {
    if(textEnteredLength === 1 && !timerRunning){
        // start Timer
        interval = setInterval(startTimer,10);
        timerRunning = true;
    }
};

// Start Timer
let startTimer = () => {
    timer++;
    minutes = Math.floor((timer/100)/60);
    seconds = Math.floor((timer/100) - (minutes * 60));
    milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));

    $('#minutes').text(leadingZero(minutes));
    $('#seconds').text(leadingZero(seconds));
    $('#m-seconds').text(leadingZero(milliSeconds));
};

// Leading Zero
let leadingZero = (time) => {
    if(time <= 9){
        return "0" + time;
    }
    else{
        return time;
    }
};

// clearFields
let clearFields = () => {
    timer = 0;
    timerRunning = false;
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;
    interval = 0;
};

// Generate Random Text
let generateRandomText = () => {
    let randomIndex = Math.round(Math.random() * 10);
    let randomText = textArray[randomIndex];
    $('#original-text').text(randomText.trim());
};

// display Modal
let displayModal = () => {

    let resultText = `Minutes : ${leadingZero(minutes)} \n 
                        Seconds : ${leadingZero(seconds)}
                         Milli Seconds : ${leadingZero(milliSeconds)}`;
    $('#results').text(resultText);
    $('#congrats-modal').modal('show');
};