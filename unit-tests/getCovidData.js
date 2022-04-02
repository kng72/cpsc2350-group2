function getCovidData(contents){
    
    let totalCases = contents["Total Cases_text"];
    let recoveredCases = contents["Total Recovered_text"];
    let deaths = contents["Total Deaths_text"];
    let activeCases = totalCases - recoveredCases - deaths;

    return activeCases;
}

module.exports = getCovidData;