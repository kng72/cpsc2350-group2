function queryGeneration(color, interest) {
    queryURL = "https://api.pexels.com/v1/search?query=" + interest + "&orientation=landscape&color=" + color;

    return queryURL;
}

module.exports = queryGeneration;