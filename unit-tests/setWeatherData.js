function setWeatherData(overall, desc, feels_like, minT, maxT, pressure, humi, wndspd, windir, temp, sunrise, sunset, cloud){
    
    temp = Math.round(temp - 273.15);

    return temp;
}

module.exports = setWeatherData;