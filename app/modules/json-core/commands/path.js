const
  Command = require("../../../components/Command"),
  utils = require("../../../utils"),

  chalk = require("chalk");

class PathCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("path [path]", "Gets or sets the path within the current context")
      .validate((args) => {
        console.log(utils);
        if(args.path) {
          if (utils.json.hasProperty(vorpal.dump.context, args.path)) {
            return true;
          } else {
            return "No such path in context " + args.path;
          }
        } else {
          return true;
        }
      })
      .action ((args, callback) => {
        if (args.path) {
          vorpal.dump.path = args.path;
          callback();
        } else {
          if (vorpal.dump.path == null) {
            vorpal.log("/");
          } else {
            vorpal.log("/" + vorpal.dump.path);
          }
          callback();
        }
      });
  }
}

module.exports = PathCommand;
