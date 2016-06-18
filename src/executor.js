import {Casper} from 'casper';
import fs from 'fs';

import utils from './modules/utils';
import {message} from './modules/cli';

import Parser from 'modules/Parser';
import TimeReceiver from './modules/TimeReceiver';
import reporters from 'modules/Reporters/reportersRegister';

const casper = Casper({
  verbose: true,
  logLevel: 'debug'
});

casper.on('error', function (err) {
  this.log(err, 'error');
  this.exit(1);
});

//========================================

console.log(reporters.yaml);

const args = JSON.parse(casper.cli.get(0)); //JSON object of args passed by Python
const conf = fs.read(args.configPath);
const parser = new Parser(args.confParser, conf);
const commands = parser.parsedCommands;
const timeReceiver = new TimeReceiver(casper);

let metrics = [];

casper.start().eachThen(commands, function (res) {
  const command = res.data;

  let curMetricIndex = metrics.push({
    url: command.url
  }) - 1;

  timeReceiver.setPageLoadingTime(metrics[curMetricIndex], command.url);

  this.open(command.url, command.opts);
}).run();

casper.then(function () {
  //TODO temp! for testing
  const reporterName = 'yaml';

  const reporter = new reporters[reporterName](metrics);

  reporter.report();
  console.log('METRICS: ', JSON.stringify(metrics));
});
