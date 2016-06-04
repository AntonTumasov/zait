const casper = window.casper = require('casper').Casper({
  verbose: true,
  logLevel: 'debug'
});

casper.on('error', function (err) {
  this.log(err, 'error');
  this.exit(1);
});

//===========================================

const config = require('modules/parser');
const commands = config.parsedCommands;
const TimeReceiver = require('./modules/TimeReceiver').TimeReceiver;
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
