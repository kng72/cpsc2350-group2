function filterCountry(jsonData, searchTerm){
    for(x in jsonData){
        if(jsonData[x]["Code"] == searchTerm){
            return jsonData[x]["Name"].toLowerCase();
        }
    }
    console.log("Data not found");
}

module.exports = filterCountry;