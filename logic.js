var API_KEY = "81586ed3d141ca5ed03e139af8564353";
// let cityName = "Toronto";

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        var cityName = $("#cityText").val();
        fetchWeather(cityName);
    }
});

function setWeatherData(temp, sunrise, sunset, cloud){
    $("#temp").text(Math.round(temp - 273.15) + "°C");
    $("#day_duration").text(Math.abs(getDayDuration(sunrise, sunset)) + " hours");
    $("#cloud_c").text(cloud + "%");
}

function getDayDuration(sunrise, sunset){
    var sunrise = new Date(sunrise * 1000).getHours();
    var sunset = new Date(sunset * 1000).getHours();

    var hourDiff = sunset - sunrise;
    return hourDiff;
}



// console.log(getDayDuration(test1, test2));




function fetchWeather(cityName){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    fetch(url)
    .then(response => response.text())
    .then(contents => {
        data = contents
        obj = JSON.parse(contents)

        let temp = obj["main"]["temp"];
        let sunrise = obj["sys"]["sunrise"];
        let sunset = obj["sys"]["sunset"];
        let cloud = obj["clouds"]["all"];

        setWeatherData(temp, sunrise, sunset, cloud);
        console.log(obj);

    })
}

// setWeatherData();
// fetchWeather(cityName);

