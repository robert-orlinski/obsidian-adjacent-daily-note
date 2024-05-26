import AdjacentDailyNote from "./index";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface AdjacentDailyNoteSettings {
  skipWeekends: boolean;
  enableRibbonIcon: boolean;
}

export const DEFAULT_SETTINGS: Partial<AdjacentDailyNoteSettings> = {
  skipWeekends: false,
  enableRibbonIcon: true,
};

export class AdjacentDailyNoteSettingTab extends PluginSettingTab {
  plugin: AdjacentDailyNote;

  constructor(app: App, plugin: AdjacentDailyNote) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Skip weekends")
      .setDesc("Skip weekends when opening yesterday's and tomorrow's daily notes.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.skipWeekends).onChange(async (value) => {
          this.plugin.settings.skipWeekends = value;
          await this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Show icons in sidebar")
      .setDesc("Show yesterday's and tomorrow's daily note icons in the sidebar ribbon.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.enableRibbonIcon)
          .onChange(async (enableRibbonIcon) => {
            this.plugin.settings.enableRibbonIcon = enableRibbonIcon;
            await this.plugin.saveSettings();

            if (enableRibbonIcon) {
              this.plugin.ribbonHandler.addRibbonIcons();
            } else {
              this.plugin.ribbonHandler.removeRibbonIcons();
            }
          }),
      );
  }
}
