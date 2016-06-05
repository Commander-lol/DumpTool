/**
  Plugin.js
  Class stub for all dump-tool console plugins. A plugin contains a set of
  commands
**/

class Plugin {
  constructor() {
    this.commands = [];
    this._pfx = null;
    this.hook = this.hook.bind(this);
  }

  addCommand(...commands) {
    this.commands = this.commands.concat(commands);
  }

  prefix(prefix) {
    if (prefix == null) {
      return this._pfx == null ? "" : this._pfx + " ";
    } else {
      if (prefix.trim() === "") {
        this._pfx = null;
      } else {
        this._pfx = prefix;
      }
    }
  }

  hook(vorpal, options = {}) {
    let
      self = this,
      proxiedVorpal = new Proxy(vorpal, {
        get: (target, prop, reciever) => {
          if (prop === "command") {
            return function (cmd, ...args) {
              return target[prop](self.prefix() + cmd, ...args);
            }
          } else {
            return target[prop];
          }
        }
      });

    for(let command of this.commands) {
      command.hook(proxiedVorpal, options);
    }
  }
}

module.exports = Plugin;
