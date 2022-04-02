var API_KEY = "81586ed3d141ca5ed03e139af8564353";
let pex_api_key = "563492ad6f91700001000001a11ae3dad369402b802a6dae2618f9fb";
var queryURL = "";

function queryGeneration(color, interest) {
    queryURL = "https://api.pexels.com/v1/search?query=" + interest + "&orientation=landscape&color=" + color;
}

function imageSearch(interest){
    queryGeneration("000000", interest);

    console.log(queryURL);
    $.ajax({
        method: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", pex_api_key);
        },
        url: queryURL,
        success: function (data) {
            console.log(data);
            let rand2 = Math.floor(Math.random() * data["photos"].length);
            let imgurl = data["photos"][rand2]["src"]["original"];
            let avg_color = data["photos"][rand2]["avg_color"];

            let bgimage = new Image();
            bgimage.src = imgurl;

            $(bgimage).on('load', function () {
                $("#web_background").css("background-image", "url(" + $(this).attr("src") + ")").fadeIn(2000, 'linear');
                $("#position_container").css("background-color", avg_color + "fa");
                $(".sidebar").css("background-color", avg_color + "fa");
                $(".closebtn").css("background-color", avg_color + "fa");
                
            });
        },
        error: function (error) {
            console.log(error);
        }
    })
}

imageSearch("clouds");

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        // hideBlock();
        var cityName = $("#cityText").val();
        fetchWeather(cityName);
    }
});

/**
 * This function updates the span elements in the DOM to reflect the weather data.

 * @param {string} overall - String param
 * @param {string} desc - String param
 * @param {string} feels_like - String param
 * @param {string} minT - String param
 * @param {string} maxT - String param
 * @param {string} pressure - String param
 * @param {string} humi - String param
 * @param {string} wndspd - String param
 * @param {string} windir - String param
 * @param {string} temp - String param
 * @param {string} sunrise - String param
 * @param {string} sunset - String param
 * @param {string} cloud - String param
 * @return {void} - Does not return anything.
 */

function setWeatherData(overall, desc, feels_like, minT, maxT, pressure, humi, wndspd, windir, temp, sunrise, sunset, cloud){
    $("#overall").text(overall);
    $("#desc").text(desc);
    $("#feels_like").text(Math.round(feels_like - 273.15) + "°C");
    $("#minT").text(Math.round(minT - 273.15) + "°C");
    $("#maxT").text(Math.round(maxT - 273.15) + "°C");
    $("#pressure").text(pressure);
    $("#humi").text(humi);
    $("#wndspd").text(wndspd);
    $("#wnddir").text(windir + "°");
    $("#temp").text(Math.round(temp - 273.15) + "°C");
    $("#day_duration").text(Math.abs(getDayDuration(sunrise, sunset)) + " hours");
    $("#cloud_c").text(cloud + "%");
}

function setCovidData(active, recovered, deaths){
    if(isNaN(active)){
        active = "There is no data for active cases";
    }
    if(isNaN(recovered)){
        recovered = "There is no data for recovered cases";
    }
    if(isNaN(deaths)){
        deaths = "There is no data for deaths";
    }
    $("#active").text(active);
    $("#recovered").text(recovered);
    $("#deaths").text(deaths);
}

function getDayDuration(sunrise, sunset){
    var sunrise = new Date(sunrise * 1000).getHours();
    var sunset = new Date(sunset * 1000).getHours();

    var hourDiff = sunset - sunrise;
    return hourDiff;
}

function searchCountryISO(){
    return fetch("./data_json.json")
    .then(results => results.json());
}

function filterCountry(jsonData, searchTerm){
    for(x in jsonData){
        if(jsonData[x]["Code"] == searchTerm){
            return jsonData[x]["Name"].toLowerCase();
        }
    }
    console.log("Data not found");
}

function getCovidData(country){
    let covidURL = `https://covid-19.dataflowkit.com/v1/${country}`;

    fetch(covidURL)
    .then(response => response.json())
    .then(contents => {
        let totalCases = parseInt(contents["Total Cases_text"].replaceAll(',', ''));
        let recoveredCases = parseInt(contents["Total Recovered_text"].replaceAll(',', ''));
        let deaths = parseInt(contents["Total Deaths_text"].replaceAll(',', ''));
        let activeCases = totalCases - recoveredCases - deaths;

        setCovidData(activeCases, recoveredCases, deaths);
        setRiskLevel(riskCalculation(totalCases, recoveredCases));

        console.log(riskCalculation(totalCases, recoveredCases));
        console.log(contents);
    });
}

function travelAdvisory(countrycode){
    let travel_url = `https://www.travel-advisory.info/api?countrycode=${countrycode}`;
    fetch(travel_url)
    .then(response => response.text())
    .then(contents => {
        data = contents;
        obj = JSON.parse(contents);

        let message = obj["data"][countrycode]["advisory"]["message"];
        let score = obj["data"][countrycode]["advisory"]["score"];
        let last_updated = obj["data"][countrycode]["advisory"]["updated"];
        let source = obj["data"][countrycode]["advisory"]["source"];

        $("#advisory").text(message);
        $("#score").text(score);
        $("#last_update").text(last_updated);
        $("#covid_source").attr("href", source);


        console.log(obj);
    })
}

function fetchWeather(cityName){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    fetch(url)
    .then(response => response.text())
    .then(contents => {
        data = contents
        obj = JSON.parse(contents)

        console.log(obj);

        let overall = obj["weather"][0]["main"];
        let desc = obj["weather"][0]["description"];
        let feels_like = obj["main"]["feels_like"];
        let minT = obj["main"]["temp_min"];
        let maxT = obj["main"]["temp_max"];
        let pressure= obj["main"]["pressure"];
        let humi = obj["main"]["humidity"];
        let wndspd = obj["wind"]["speed"];
        let windir = obj["wind"]["deg"];
        let temp = obj["main"]["temp"];
        let sunrise = obj["sys"]["sunrise"];
        let sunset = obj["sys"]["sunset"];
        let cloud = obj["clouds"]["all"];

        setWeatherData(overall, desc, feels_like, minT, maxT, pressure, humi, wndspd, windir, temp, sunrise, sunset, cloud);
        showWeatherBlock();
        blockTrigger();
        imageSearch(cityName);

        setCityName(cityName);
        travelAdvisory(obj["sys"]["country"]);
        let countryName = obj["sys"]["country"];

        searchCountryISO().then((country) => {
            let countryFullName = filterCountry(country,countryName);
            getCovidData(countryFullName);
        });
    })
}

function setCityName(cityName){
    $("#city_name").text(cityName);
}

function showWeatherBlock(){
    $("#foreground_info > *:not(:first-child)").css("color", "white");
    // $("#position_container").css("display", "block");
    $("#covid_source").css("color", "white");
    $("#info_container").css("color", "white");

}

function hideBlock(){
    $("#foreground_info > *:not(:first-child)").css("color", "transparent");
}

let box = document.getElementById('position_container');

function blockTrigger(){
    box.classList.remove('hidden');
    setTimeout(function () {
        box.classList.remove('visuallyhidden');
    }, 20);
}

function getDate(){
    const d = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let today = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = String(d.getFullYear()).slice(-2);

    let final = today + ", " + date + " " + month + " " + year + "'";
    $("#date").text(final);
}

getDate();

function openNav() {
    document.getElementById("mySidebar").style.width = "23vw";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}
