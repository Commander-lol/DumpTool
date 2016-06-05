const
  Command = require("../../../components/Command"),
  chalk = require("chalk");

class LoadCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("print", "Prints out the currently loaded context")
      .option("-s <spaces>", "Specify the number spaces to use in formatting")
      .validate((args) => {
        if (vorpal.dump.context == null) {
          return "No context loaded"
        } else {
          return true;
        }
      })
      .action ((args, callback) => {
        var spaces = args.options.s == null ? 2 : args.options.s;
        vorpal.log(JSON.stringify(vorpal.dump.context, null, spaces));
        callback();
      });
  }
}

module.exports = LoadCommand;
