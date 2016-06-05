const
  Command = require("../../../components/Command"),

  _ = require("lodash"),
  chalk = require("chalk");

class LsCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("ls [path]", "List the contents of [path] or the current directory if not present")
      .option("-a", "List hidden files and directories")
      .validate((args) => {
        if (args.path) {
          let exs = vorpal.fs.exists(args.path);
          if (exs == "dir" || exs == "file") {
            return true;
          } else {
            return "No such file or directory " + vorpal.fs.path(args.path);
          }
        }
      })
      .action((args, callback) => {
        let
          path = args.path || ".",
          entries = vorpal.fs.list(path);

        entries = entries.map(e => vorpal.fs.inspect(e));
        entries = _.sortBy(
          (
            args.options.a
              ? entries
              : entries.filter(e => !e.name.startsWith("."))
          )
          .map(e => _.set(e, "name", (
            e.type == "dir"
            ?  chalk.cyan.bold(e.name) + "/"
            : e.name
          ))),
        "type"
        );
        for (let e of entries) {
          vorpal.log(e.name);
        }
        callback();
      });
  }
}

module.exports = LsCommand;
