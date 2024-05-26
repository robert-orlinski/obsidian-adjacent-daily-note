import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";
import AdjacentDailyNote from "src";
import { triggerDailyNotesDependencyNotice } from "src/extensions/notice";
import { openNextDailyNote, openPreviousDailyNote } from "src/extensions/daily-notes";

export class CommandHandler {
  private plugin: AdjacentDailyNote;

  constructor(plugin: AdjacentDailyNote) {
    this.plugin = plugin;
  }

  setup() {
    this.plugin.addCommand({
      id: "create-yesterdays-daily-note",
      name: "Open yesterday's daily note",
      checkCallback: (checking: boolean) => {
        if (!checking) {
          if (!appHasDailyNotesPluginLoaded()) {
            triggerDailyNotesDependencyNotice();
            return;
          } else {
            openPreviousDailyNote(this.plugin.settings.skipWeekends);
          }
        }

        return true;
      },
    });
    this.plugin.addCommand({
      id: "create-tomorrows-daily-note",
      name: "Open tomorrow's daily note",
      checkCallback: (checking: boolean) => {
        if (!checking) {
          if (!appHasDailyNotesPluginLoaded()) {
            triggerDailyNotesDependencyNotice();
            return;
          } else {
            openNextDailyNote(this.plugin.settings.skipWeekends);
          }
        }

        return true;
      },
    });
  }
}
