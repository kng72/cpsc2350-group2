var contents = {"Total Cases_text": 20000, "Total Recovered_text": 15000, "Total Deaths_text": 1000};

const getCovidData = require("./getCovidData");

test("Test for getCovidData", () => {
    expect(
        getCovidData(contents)
        ).toBe(4000)
});