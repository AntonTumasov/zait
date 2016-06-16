import {Casper} from 'casper';
import Parser from 'modules/Parser';
import TimeReceiver from './modules/TimeReceiver';
import utils from './modules/utils';
import {message} from './modules/cli';
import fs from 'fs';

const casper = Casper({
  verbose: true,
  logLevel: 'debug'
});

casper.on('error', function (err) {
  this.log(err, 'error');
  this.exit(1);
});

//========================================

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
  console.log('METRICS: ', JSON.stringify(metrics));
});
