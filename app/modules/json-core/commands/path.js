const
  Command = require("../../../components/Command"),
  utils = require("../../../utils"),

  _ = require("lodash");

class PathCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("path [path]", "Gets or sets the path within the current context")
      .validate((args) => {
        if(args.path) {
          if (_.has(vorpal.dump.context, args.path)) {
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
