function getDayDuration(sunrise, sunset){
    var sunrise = new Date(sunrise * 1000).getHours();
    var sunset = new Date(sunset * 1000).getHours();

    var hourDiff = sunset - sunrise;
    return hourDiff;
}

module.exports = getDayDuration;

