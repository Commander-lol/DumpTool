/**
 fs/index.js
 Entry point for vorpal FileSystem module
 **/

const
  Plugin = require("../../components/Plugin"),
  IterableObject = require("../../components/IterableObject"),

  Command_Compare = require("./commands/compare");

  // Command_Load = require("./commands/load"),
  // Command_Path = require("./commands/path"),
  // Command_Print = require("./commands/print");

class JsonComparePlugin extends Plugin {
  constructor() {
    super();
    this.addCommand(new Command_Compare());
  }

  setup (vorpal) {}
}

module.exports = JsonComparePlugin;
