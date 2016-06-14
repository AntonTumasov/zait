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

casper.cli.drop('casper-path');
casper.cli.drop('cli');

//========================================

let confParser = casper.cli.get('parser') || 'json';
confParser = confParser.toLowerCase().trim();

let configPath = casper.cli.get('file') || `pageload.${confParser}`;
let conf = fs.read(configPath.trim());

const parser = new Parser(confParser, conf);

const commands = parser.parsedCommands;
const timeReceiver = new TimeReceiver(casper);

let metrics = [];

casper.start().eachThen(commands, function (res) {
  const command = res.data;

  let curMetricIndex = metrics.push({
    url: command.url,
    metrics: {}
  }) - 1;

  timeReceiver.setPageLoadingTime(metrics[curMetricIndex].metrics, command.url);

  this.open(command.url, command.opts);
}).run();

casper.then(function () {
  console.log('METRICS: ', JSON.stringify(metrics));
});
