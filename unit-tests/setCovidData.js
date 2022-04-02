function setCovidData(active, recovered, deaths){
    if(isNaN(active)){
        active = "no data available";
    }
    if(isNaN(recovered)){
        recovered = "no data available";
    }
    if(isNaN(deaths)){
        deaths = "no data available";
    }

    return active;
}

module.exports = setCovidData;