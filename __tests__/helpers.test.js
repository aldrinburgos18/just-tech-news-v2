const { format_date, format_plural } = require("../utils/helpers");

test("format_date() returns a date string", () => {
  const date = new Date("2022-04-23 20:46:00");

  expect(format_date(date)).toBe("4/23/2022");
});

test("format_plural() returns pluralized words based on amount", () => {
  const word = "tiger";
  const amount = 2;

  expect(format_plural(word, amount)).toBe("tigers");
});
