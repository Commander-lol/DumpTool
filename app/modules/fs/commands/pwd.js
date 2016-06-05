const Command = require ("../../../components/Command");

class PwdCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("pwd", "Output the current directory")
      .action((args, callback) => {
        vorpal.log(vorpal.fs.cwd());
        callback();
      });
  }
}

module.exports = PwdCommand;
