const
  Command = require("../../../components/Command"),
  chalk = require("chalk");

class PrintCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("print", "Prints out the currently loaded context")
      .option("-s <spaces>", "Specify the number spaces to use in formatting")
      .option("-i <instances>", "The instances to print from")
      .types({
        string: ['i']
      })
      .validate((args) => {
        if (vorpal.dump.context == null) {
          return "No context loaded"
        } else {
          if(args.options.i && vorpal.dump.instances.empty()) {
            return "No instances in context";
          }
          return true;
        }
      })
      .action ((args, callback) => {
        var spaces = args.options.s == null ? 2 : args.options.s;
        if(args.options.i == null) {
          vorpal.log(JSON.stringify(vorpal.dump.context, null, spaces));
        } else {
          let instances = args.options.i.split(",").map(inst => inst.trim());
          for (let i of instances) {
            vorpal.log(JSON.stringify(vorpal.dump.instances[i].data, null, spaces));
          }
        }
        callback();
      });
  }
}

module.exports = PrintCommand;
