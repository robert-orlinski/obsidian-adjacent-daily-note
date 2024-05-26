import { TFile } from "obsidian";
import {
  getAllDailyNotes,
  getDailyNote,
  createDailyNote,
} from "obsidian-daily-notes-interface";
import { getNextDailyNoteDate, getPreviousDailyNoteDate } from "../core/dates";

export async function openPreviousDailyNote(skipWeekends: boolean): Promise<void> {
  openDailyNote(getPreviousDailyNoteDate(skipWeekends));
}

export async function openNextDailyNote(skipWeekends: boolean): Promise<void> {
  openDailyNote(getNextDailyNoteDate(skipWeekends));
}

export async function openDailyNote(date: moment.Moment): Promise<void> {
  const note = await getOrCreateDailyNote(date);

  if (note) openNote(note);
}

async function getOrCreateDailyNote(date: moment.Moment): Promise<TFile | void> {
  let nextDailyNote = getDailyNote(date, getAllDailyNotes());
  if (!nextDailyNote) {
    nextDailyNote = await createDailyNote(date);
  }

  return nextDailyNote;
}

async function openNote(file: TFile): Promise<void> {
  const { workspace } = window.app;
  const leaf = workspace.getLeaf(false);
  await leaf.openFile(file, { active: true });
}
