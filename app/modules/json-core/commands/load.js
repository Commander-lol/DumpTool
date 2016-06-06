const
  Command = require("../../../components/Command"),
  IterableObject = require("../../../components/IterableObject"),

  _ = require("lodash"),
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
        var
          obj,
          instances = new IterableObject();

        try {
          obj = vorpal.fs.read(args.path, "json");
        } catch (e) {
          if (e.message.startsWith("JSON parsing failed")) {
            vorpal.log(chalk.red(`File ${vorpal.fs.path(args.path)} is not a valid JSON file`));
            callback();
            return;
          } else {
            throw e;
          }
        }

        {
          let
            keys = Object.keys(obj),
            klength = keys.length,
            tmpInstances = [];
          for (let key of keys) {
            let [index, name] = key.split("-");
            if (index != null && name != null) {
              tmpInstances.push({index, name, key});
            }
          }

          if (tmpInstances.length === klength) {

            for (let inst of tmpInstances) {
              instances.set({
                [inst.index]: {
                  name: inst.name,
                  data: obj[inst.key]
                }
              })
            }
          }
        }

        vorpal.dump.set({
          context: obj,
          instances,
          path: null
        });
        callback();
      });
  }
}

module.exports = LoadCommand;
