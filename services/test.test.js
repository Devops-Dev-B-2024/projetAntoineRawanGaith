const { addFunction } = require("./bla");

describe("Test about addFunction()", () => {
  it("should perform sum with positive number", () => {
    const a = 3;
    const b = 4;

    const result = addFunction(a, b);

    expect(result).toEqual(7);
  });
});
