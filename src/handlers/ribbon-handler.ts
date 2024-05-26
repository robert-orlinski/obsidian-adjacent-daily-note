import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";
import AdjacentDailyNote from "src";
import { triggerDailyNotesDependencyNotice } from "src/extensions/notice";
import { openNextDailyNote, openPreviousDailyNote } from "src/extensions/daily-notes";

const YESTERDAYS_DAILY_NOTE_ICON_ID = "yesterdays-daily-note-ribbon-icon";
const TOMORROWS_DAILY_NOTE_ICON_ID = "tomorrows-daily-note-ribbon-icon";

export class RibbonHandler {
  private plugin: AdjacentDailyNote;

  constructor(plugin: AdjacentDailyNote) {
    this.plugin = plugin;
  }

  setup() {
    if (this.plugin.settings.enableRibbonIcon) {
      this.addRibbonIcons();
    }
  }

  addRibbonIcons() {
    this.plugin
      .addRibbonIcon("calendar-minus", "Open yesterday's daily note", async () => {
        if (!appHasDailyNotesPluginLoaded()) {
          triggerDailyNotesDependencyNotice();
          return;
        } else {
          await openPreviousDailyNote(this.plugin.settings.skipWeekends);
        }
      })
      .setAttribute("id", YESTERDAYS_DAILY_NOTE_ICON_ID);
    this.plugin
      .addRibbonIcon("calendar-plus", "Open tomorrow's daily note", async () => {
        if (!appHasDailyNotesPluginLoaded()) {
          triggerDailyNotesDependencyNotice();
          return;
        } else {
          await openNextDailyNote(this.plugin.settings.skipWeekends);
        }
      })
      .setAttribute("id", TOMORROWS_DAILY_NOTE_ICON_ID);
  }

  removeRibbonIcons() {
    document.getElementById(YESTERDAYS_DAILY_NOTE_ICON_ID)?.remove();
    document.getElementById(TOMORROWS_DAILY_NOTE_ICON_ID)?.remove();
  }
}
