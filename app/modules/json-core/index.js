/**
 fs/index.js
 Entry point for vorpal FileSystem module
 **/

const
  Plugin = require("../../components/Plugin"),
  IterableObject = require("../../components/IterableObject"),
  
  Command_Load = require("./commands/load"),
  Command_Path = require("./commands/path"),
  Command_Print = require("./commands/print");

class JsonCorePlugin extends Plugin {
  constructor() {
    super();
    this.addCommand(new Command_Load());
    this.addCommand(new Command_Path());
    this.addCommand(new Command_Print());
  }

  setup (vorpal) {
    vorpal.dump = new IterableObject({
      context: null,
      instances: new IterableObject(),
      path: null
    });
  }
}

module.exports = JsonCorePlugin;
