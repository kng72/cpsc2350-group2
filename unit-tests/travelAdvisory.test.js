var obj = {"data": {"AD": {"advisory": {"score": 4.3}}}};

const travelAdvisory = require("./travelAdvisory");

test("Test for travelAdvisory", () => {
    expect(
        travelAdvisory("AD", obj)
        ).toBe(4.3)
});