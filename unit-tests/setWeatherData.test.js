const setWeatherData = require("./setWeatherData");

test("Test for setWeatherData", () => {
    expect(
        setWeatherData(10,10,10,10,10,10,10,10,10,280,10,10,10)
        ).toBe(7)
});