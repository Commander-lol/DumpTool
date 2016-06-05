/**
 fs/index.js
 Entry point for vorpal FileSystem module
 **/

const
  Plugin = require("../../components/Plugin"),
  Command_Load = require("./commands/load");
  Command_Print = require("./commands/print");

class JsonCorePlugin extends Plugin {
  constructor() {
    super();
    this.addCommand(new Command_Load());
    this.addCommand(new Command_Print());
  }

  setup (vorpal) {
    vorpal.dump = {
      context: null,
      path: null
    }
  }
}

module.exports = JsonCorePlugin;
