var Command = require("../../../components/Command");

class CdCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("cd <path>", "Changes the current directory")
      .validate((args) => {
        switch (vorpal.fs.exists(args.path)) {
          case "dir":
            return true;
          case "file":
            return "Cannot cd to file";
          case false:
            return "No such directory " + vorpal.fs.path(args.path);
          default:
            return "Failed to cd to path " + vorpal.fs.path(args.path);
        }
      })
      .action ((args, callback) => {
        vorpal.fs = vorpal.fs.cwd(args.path);
        if (options.oncd) {
          options.oncd(vorpal.fs, callback);
        } else {
          callback();
        }
      });
  }
}

module.exports = CdCommand;
