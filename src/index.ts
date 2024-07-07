#!/usr/bin/env node
import { Command } from "commander";
import packajson from "../package.json";
import adapter from "./main/adapter";

const program = new Command();
program
  .name(packajson.name)
  .description(packajson.description)
  .version(packajson.version);

program
  .command("create <name>")
  .description("Create a new file based on a template")
  .option("-test, --tests", "Create test")
  .option("-onlyTest", "--onlyTest", "Run only test")
  .option("-pro", "--properties", "Properties")
  .option("-req, --request", "Create Request")
  .option("-mid, --midleware", "Create Midleware")
  .option("-err, --error", "Create error")
  .option("-trans, --translation", "Create Translation")
  .option("-vali, --validation", "Create Validation")
  .action((name, options) => {
    adapter(name, options, process.cwd());
  });
program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log("options", options);
