#!/usr/bin/env node

const
  vorpal = require("vorpal"),
  Mod_Fs = require("./app/modules/fs"),
  Loader = require("./app/components/Loader");

var
  prelude = vorpal(),
  states = {},

  modfs = new Mod_Fs();

modfs.prefix("fs");

Loader.load(modfs);

prelude.use(Loader.hook);

prelude
  .delimiter("dt~$")
  .show();
