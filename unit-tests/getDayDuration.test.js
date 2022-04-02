const getDayDuration = require("./getDayDuration");

test("Test for getDayDuration", () => {
    expect(
        getDayDuration(15500000,15000000)
        ).toBe(5)
});