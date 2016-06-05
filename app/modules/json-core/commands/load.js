const
  Command = require("../../../components/Command"),
  chalk = require("chalk");

class LoadCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("load <path>", "Loads the specified JSON file into the context")
      .validate((args) => {
        switch (vorpal.fs.exists(args.path)) {
          case "dir":
            return `Cannot load directory ${vorpal.fs.path(args.path)}`;
          case "file":
            return true;
          case false:
            return `No such file or directory ${vorpal.fs.path(args.path)}`;
          default:
            return `Failed to load dump ${vorpal.fs.path(args.path)}`;
        }
      })
      .action ((args, callback) => {
        var obj;
        try {
          obj = vorpal.fs.read(args.path, "json");
        } catch (e) {
          if (e.message.startsWith("JSON parsing failed")) {
            vorpal.log(chalk.red(`File ${vorpal.fs.path(args.path)} is not a valid JSON file`));
            callback();
          } else {
            throw e;
          }
        }
        vorpal.dump.set({
          context: obj,
          path: null
        });
        callback();
      });
  }
}

module.exports = LoadCommand;
