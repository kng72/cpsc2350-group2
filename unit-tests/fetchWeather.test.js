var obj = {"main": {"feels_like": 290}};

const fetchWeather = require("./fetchWeather");

test("Test for fetchWeather", () => {
    expect(
        fetchWeather(obj)
        ).toBe(290)
});