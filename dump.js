#!/usr/bin/env node

const
    vorpal = require("vorpal"),
    Module_Fs = require("./app/modules/fs"),
    Loader = require("./app/components/Loader");

var
  prelude = vorpal(),
  loader = new Loader(__dirname + "/app");

  modfs = new Module_Fs();

modfs.prefix("fs");

loader.load(modfs);
loader.load("modules/json-core");

prelude.use(loader.hook);

prelude
  .delimiter("dt~$")
  .show();
