var data = [
    {"Code": "AF", "Name": "Afghanistan"},
    {"Code": "AD", "Name": "Andorra"}
];

const filterCountry = require("./filterCountry");

test("Test for filterCountry", () => {
    expect(
        filterCountry(data,"AF")
        ).toBe("afghanistan")
});