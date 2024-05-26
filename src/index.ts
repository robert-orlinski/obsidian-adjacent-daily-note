import { Plugin } from "obsidian";
import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";
import {
  DEFAULT_SETTINGS,
  AdjacentDailyNoteSettingTab,
  AdjacentDailyNoteSettings,
} from "./settings";
import { triggerDailyNotesDependencyNotice } from "./extensions/notice";
import { CommandHandler } from "./handlers/command-handler";
import { RibbonHandler } from "./handlers/ribbon-handler";

export default class AdjacentDailyNote extends Plugin {
  settings: AdjacentDailyNoteSettings;
  commandHandler: CommandHandler;
  ribbonHandler: RibbonHandler;

  async onload() {
    console.log("Loading plugin: Yesterday's and Tomorrow's Daily Note");

    await this.loadSettings();

    this.commandHandler = new CommandHandler(this);
    this.ribbonHandler = new RibbonHandler(this);
    this.triggerDependencyCheck(() => {
      this.commandHandler.setup();
      this.ribbonHandler.setup();
    });
  }

  onunload() {
    console.log("Unloading plugin: Yesterday's and Tomorrow's Daily Note");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.addSettingTab(new AdjacentDailyNoteSettingTab(this.app, this));
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  triggerDependencyCheck(callback: () => void) {
    this.app.workspace.onLayoutReady(() => {
      console.log("Checking for Daily Notes plugin");
      if (!appHasDailyNotesPluginLoaded()) {
        triggerDailyNotesDependencyNotice();
      }

      callback();
    });
  }
}
