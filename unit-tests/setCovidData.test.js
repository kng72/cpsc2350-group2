const setCovidData = require("./setCovidData");

test("Test for setCovidData 1", () => {
    expect(
        setCovidData(NaN,1000,1000)
        ).toBe("no data available")
});

test("Test for setCovidData 2", () => {
    expect(
        setCovidData(2000,1000,1000)
        ).toBe(2000)
});