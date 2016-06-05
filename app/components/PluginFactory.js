const
  Plugin = require("./Plugin"),
  IterableObject = require("./IterableObject"),

  fs = require("fs-jetpack");

class PluginFactory {
  constructor() {
    if (new.target !== PluginFactory) {
      throw new TypeError("Cannot subclass PluginFactory");
    }

    this.paths = new IterableObject();
    return new Proxy(this, {
      set: (target, prop, value) => {
        if (prop === "paths") {
          target[prop].set(value);
        } else {
          target[prop] = value;
        }
      }
    });
  }

  create(path) {
    switch (fs.exists(path)) {
      case "dir":
        let files = fs.list(fs.path(path, "commands"));
        return class FactoryPluginClass extends Plugin {
          constructor() {
            super();
            for (let file of files) {
              this.addCommand(new (require(fs.path(path, "commands", file)))());
            }
          }
        };
      case "file":
        // Assume a file is the index file for a plugin
        return require(path);
      default:
        return null;
    }
  }
}

module.exports = PluginFactory;
