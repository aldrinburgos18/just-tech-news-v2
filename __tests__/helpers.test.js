const { format_date } = require("../utils/helpers");

test("format date() returns a date string", () => {
  const date = new Date("2022-04-23 20:46:00");

  expect(format_date(date)).toBe("4/23/2022");
});
