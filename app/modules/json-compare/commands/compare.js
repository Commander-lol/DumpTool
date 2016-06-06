const
  Command = require("../../../components/Command"),
  IterableObject = require("../../../components/IterableObject"),
  utils = require("../../../utils");

  _ = require("lodash"),
  Table = require("cli-table"),
  chalk = require("chalk");

class CompareCommand extends Command {
  hook(vorpal, options={}) {
    vorpal
      .command("compare <path>", "Compare the specified path from the context")
      .option("-i <instances>", "The instances to print from")
      .option("-t", "List the types of each thing")
      .option("-c", "Perform coercion for objects that only contain numeric keys into arrays")
      .option("-f <filters>", "Properties to pull for each element if the path is an array of objects")
      .types({
        string: ['i', 'f']
      })
      .validate((args) => {
        // if (args.options.i != null) {
        //   let i = args.options.i;
        //   if (i !== "all") {
        //     let err = "";
        //     i = i.split(",").map(inst => inst.trim());
        //     for (let val of i) {
        //       if (!val in Object.values(vorpal.dump.instances)) {
        //         err += `No such instance ${val}\n`;
        //       }
        //     }
        //     if (err === "") {
        //       return err;
        //     } else {
        //       return true;
        //     }
        //   }
        // }
        return true;
      })
      .action ((args, callback) => {
        var instances = Object.keys(vorpal.dump.instances);
        if (args.options.i != null) {
          instances = args.options.i.toLowerCase() === "all" ? instances : args.options.i.split(",").map(inst => inst.trim());
        }

        let
          picks = args.options.f != null ? args.options.f.split(",").map(p => p.trim()) : null,
          data = _.filter(vorpal.dump.instances, (v, i) => {
            return instances.indexOf(i) > -1;
          }),
          handlingArray = true,
          head = [""].concat(data.map(i => i.name)),
          table = new Table({head}),
          relevant = data.map(d => utils.json.getProperty(d.data, args.path)),
          rows = [];

        if (args.options.c) {
          relevant = relevant.map(r => {
            if (!_.isArray(r) && typeof r === "object") {
              // Object might be array, lets give it a check
              let isActuallyArray = true;
              for (let key of Object.keys(r)) {
                isActuallyArray = isActuallyArray && isFinite(key);
              }
              return Object.values(r);
            } else {
              return r;
            }
          });
        }

        for (let prop of relevant) {
          handlingArray = handlingArray && _.isArray(prop);
        }

        if (args.options.t) {
          let row = ["Type"];
          for (let rel of relevant) {
            row.push(_.isArray(rel) ? "array" : typeof(rel));
          }
          rows.push(row);
        } else if (handlingArray) {
          let
            more = true,
            c = 0;
          while (more) {
            let rowData = [args.path + " [" + String(c) + "]"];
            more = false;
            for (let prop of relevant) {
              if (prop[c] != null) {
                more = more || true;
                if(picks != null) {
                  rowData.push(JSON.stringify(_.pick(prop[c], picks)));
                } else {
                  rowData.push(JSON.stringify(prop[c]));
                }
              } else {
                rowData.push("");
              }
            }
            if (more) {
              rows.push(rowData);
            }
            c += 1;
          }
        } else {
          let rowData = [args.path];
          for (let prop of relevant) {
            rowData.push(JSON.stringify(prop));
          }
          rows.push(rowData);
        }

        for(let row of rows) {
          table.push(row);
        }

        vorpal.log(table.toString());
        callback();
      });
  }
}

module.exports = CompareCommand;
