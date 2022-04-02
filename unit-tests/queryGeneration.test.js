const queryGeneration = require("./queryGeneration");

test("Test for getCovidData", () => {
    expect(
        queryGeneration("red","vancouver")
        ).toBe("https://api.pexels.com/v1/search?query=vancouver&orientation=landscape&color=red")
});