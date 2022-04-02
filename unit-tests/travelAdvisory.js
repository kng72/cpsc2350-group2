function travelAdvisory(countrycode, obj){
    
    let score = obj["data"][countrycode]["advisory"]["score"];

    return score;
    
}

module.exports = travelAdvisory;