const path = require("path");

class Loader {
  constructor(rootPath) {
    
    this.plugins = [];
    this.load = (plugin, ...pluginOpts) => {
      if(typeof plugin === "string") {
        plugin = new (require(path.resolve(rootPath, plugin)))(...pluginOpts);
      }
      this.plugins.push(plugin);
    };
    this.hook = (vorpal, options = {}) => {
      for (let plugin of this.plugins) {
        plugin.setup(vorpal, options);
        vorpal.use(plugin.hook);
      }
    };
  }
}

module.exports = Loader;
