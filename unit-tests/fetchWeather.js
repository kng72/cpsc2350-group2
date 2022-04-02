function fetchWeather(obj){
    
    let feels_like = obj["main"]["feels_like"];

    return feels_like;
   
}

module.exports = fetchWeather;