export function getPreviousDailyNoteDate(skipWeekends: boolean): moment.Moment {
  let nextDate = window.moment().subtract(1, "day");

  if (skipWeekends && isWeekend(nextDate)) {
    nextDate = getPreviousWeekday(nextDate);
  }

  return nextDate;
}

export function getPreviousWeekday(date: moment.Moment): moment.Moment {
  let nextDate = date.subtract(1, "day");

  while (isWeekend(nextDate)) {
    nextDate = nextDate.subtract(1, "day");
  }

  return nextDate;
}

export function getNextDailyNoteDate(skipWeekends: boolean): moment.Moment {
  let nextDate = window.moment().add(1, "day");

  if (skipWeekends && isWeekend(nextDate)) {
    nextDate = getNextWeekday(nextDate);
  }

  return nextDate;
}

export function getNextWeekday(date: moment.Moment): moment.Moment {
  let nextDate = date.add(1, "day");

  while (isWeekend(nextDate)) {
    nextDate = nextDate.add(1, "day");
  }

  return nextDate;
}

export function isWeekend(date: moment.Moment): boolean {
  return date.isoWeekday() > 5;
}
