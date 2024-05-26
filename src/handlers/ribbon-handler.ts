import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";
import AdjacentDailyNote from "src";
import { triggerDailyNotesDependencyNotice } from "src/extensions/notice";
import { openNextDailyNote, openPreviousDailyNote } from "src/extensions/daily-notes";

const YESTERDAY_DAILY_NOTE_ICON_ID = "yesterdays-daily-note-ribbon-icon";
const TOMORROW_DAILY_NOTE_ICON_ID = "tomorrows-daily-note-ribbon-icon";

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
      .setAttribute("id", YESTERDAY_DAILY_NOTE_ICON_ID);
    this.plugin
      .addRibbonIcon("calendar-plus", "Open tomorrow's daily note", async () => {
        if (!appHasDailyNotesPluginLoaded()) {
          triggerDailyNotesDependencyNotice();
          return;
        } else {
          await openNextDailyNote(this.plugin.settings.skipWeekends);
        }
      })
      .setAttribute("id", TOMORROW_DAILY_NOTE_ICON_ID);
  }

  removeRibbonIcons() {
    document.getElementById(YESTERDAY_DAILY_NOTE_ICON_ID)?.remove();
    document.getElementById(TOMORROW_DAILY_NOTE_ICON_ID)?.remove();
  }
}
