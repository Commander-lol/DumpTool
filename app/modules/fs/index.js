/**
  fs/index.js
  Entry point for vorpal FileSystem module
**/

const
  Plugin = require("../../components/Plugin"),
  Command_Cd = require("./commands/cd"),
  Command_Pwd = require("./commands/pwd"),
  Command_Ls = require("./commands/ls"),

  fs = require("fs-jetpack");

class FsPlugin extends Plugin {
  constructor() {
    super();
    this.addCommand(new Command_Cd());
    this.addCommand(new Command_Pwd());
    this.addCommand(new Command_Ls());
  }

  setup (vorpal) {
    vorpal.fs = fs.cwd(".");
  }
}

module.exports = FsPlugin;
