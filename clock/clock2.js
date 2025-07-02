setInterval(showTime, 1000); //calling showTime function at every second

//Defining showTime function
function showTime() {
    let time = new Date();   //date object created by new Date() represents the current date and time down to milliseconds.
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    //Setting time for 12 hours format
    if (hour>=12) {
        if(hour>12) hour -= 12;
        am_pm = "PM";
    }else if (hour == 0) {
        hr =12;
        am_pm = "AM";
    }

    hour = hour <10 ? "0" + hour : hour;
    min = min < 10 ? "0" +min : min;
    sec = sec < 10 ? "0" + sec : sec;
    
    let currentTime = 
        hour +
        ":" +
        min +
        ":" +
        sec +
        am_pm;

    document.getElementById(
        "clock"
    ).innerHTML = currentTime;
}