import * as moment from "moment";
import {
  isWeekend,
  getNextWeekday,
  getNextDailyNoteDate,
  getPreviousWeekday,
  getPreviousDailyNoteDate,
} from "../../src/core/dates";

describe("getPreviousDailyNoteDate", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("when skipWeekends is false", () => {
    it("should return yesterday when yesterday is a weekend", () => {
      const monday = moment("2021-07-05");
      const sunday = moment("2021-07-04");
      jest.setSystemTime(monday.toDate());

      const nextDate = getPreviousDailyNoteDate(false);

      expect(nextDate.format("YYYY-MM-DD")).toBe(sunday.format("YYYY-MM-DD"));
    });
  });

  describe("when skipWeekends is true", () => {
    it("should return last friday when yesterday is a weekend", () => {
      const monday = moment("2021-07-05");
      const lastFriday = moment("2021-07-02");
      jest.setSystemTime(monday.toDate());

      const nextDate = getPreviousDailyNoteDate(true);

      expect(nextDate.format("YYYY-MM-DD")).toBe(lastFriday.format("YYYY-MM-DD"));
    });

    it("should return yesterday when yesterday is a weekday", () => {
      const tuesday = moment("2021-07-06");
      const monday = moment("2021-07-05");
      jest.setSystemTime(tuesday.toDate());

      const nextDate = getPreviousDailyNoteDate(true);

      expect(nextDate.format("YYYY-MM-DD")).toBe(monday.format("YYYY-MM-DD"));
    });
  });
});

describe("getPreviousWeekday", () => {
  it("should return previous weekday", () => {
    const saturday = moment("2021-07-03");
    const sunday = moment("2021-07-04");
    const monday = moment("2021-07-05");
    const tuesday = moment("2021-07-06");
    const wednesday = moment("2021-07-07");
    const thursday = moment("2021-07-08");
    const friday = moment("2021-07-09");

    expect(getPreviousWeekday(saturday).format("YYYY-MM-DD")).toBe("2021-07-02");
    expect(getPreviousWeekday(sunday).format("YYYY-MM-DD")).toBe("2021-07-02");
    expect(getPreviousWeekday(monday).format("YYYY-MM-DD")).toBe("2021-07-02");
    expect(getPreviousWeekday(tuesday).format("YYYY-MM-DD")).toBe("2021-07-05");
    expect(getPreviousWeekday(wednesday).format("YYYY-MM-DD")).toBe("2021-07-06");
    expect(getPreviousWeekday(thursday).format("YYYY-MM-DD")).toBe("2021-07-07");
    expect(getPreviousWeekday(friday).format("YYYY-MM-DD")).toBe("2021-07-08");
  });
});

describe("getNextDailyNoteDate", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("when skipWeekends is false", () => {
    it("should return tomorrow when tomorrow is a weekend", () => {
      const friday = moment("2021-07-02");
      const saturday = moment("2021-07-03");
      jest.setSystemTime(friday.toDate());

      const nextDate = getNextDailyNoteDate(false);

      expect(nextDate.format("YYYY-MM-DD")).toBe(saturday.format("YYYY-MM-DD"));
    });
  });

  describe("when skipWeekends is true", () => {
    it("should return next monday when tomorrow is a weekend", () => {
      const friday = moment("2021-07-02");
      const nextMonday = moment("2021-07-05");
      jest.setSystemTime(friday.toDate());

      const nextDate = getNextDailyNoteDate(true);

      expect(nextDate.format("YYYY-MM-DD")).toBe(nextMonday.format("YYYY-MM-DD"));
    });

    it("should return tomorrow when tomorrow is a weekday", () => {
      const thursday = moment("2021-07-01");
      const friday = moment("2021-07-02");
      jest.setSystemTime(thursday.toDate());

      const nextDate = getNextDailyNoteDate(true);

      expect(nextDate.format("YYYY-MM-DD")).toBe(friday.format("YYYY-MM-DD"));
    });
  });
});

describe("getNextWeekday", () => {
  it("should return next weekday", () => {
    const saturday = moment("2021-07-03");
    const sunday = moment("2021-07-04");
    const monday = moment("2021-07-05");
    const tuesday = moment("2021-07-06");
    const wednesday = moment("2021-07-07");
    const thursday = moment("2021-07-08");
    const friday = moment("2021-07-09");

    expect(getNextWeekday(saturday).format("YYYY-MM-DD")).toBe("2021-07-05");
    expect(getNextWeekday(sunday).format("YYYY-MM-DD")).toBe("2021-07-05");
    expect(getNextWeekday(monday).format("YYYY-MM-DD")).toBe("2021-07-06");
    expect(getNextWeekday(tuesday).format("YYYY-MM-DD")).toBe("2021-07-07");
    expect(getNextWeekday(wednesday).format("YYYY-MM-DD")).toBe("2021-07-08");
    expect(getNextWeekday(thursday).format("YYYY-MM-DD")).toBe("2021-07-09");
    expect(getNextWeekday(friday).format("YYYY-MM-DD")).toBe("2021-07-12");
  });
});

describe("isWeekend", () => {
  it("should return true for weekend", () => {
    const saturday = moment("2021-07-03");
    const sunday = moment("2021-07-04");

    expect(isWeekend(saturday)).toBe(true);
    expect(isWeekend(sunday)).toBe(true);
  });

  it("should return false for weekday", () => {
    const monday = moment("2021-07-05");
    const tuesday = moment("2021-07-06");
    const wednesday = moment("2021-07-07");
    const thursday = moment("2021-07-08");
    const friday = moment("2021-07-09");

    expect(isWeekend(monday)).toBe(false);
    expect(isWeekend(tuesday)).toBe(false);
    expect(isWeekend(wednesday)).toBe(false);
    expect(isWeekend(thursday)).toBe(false);
    expect(isWeekend(friday)).toBe(false);
  });
});
