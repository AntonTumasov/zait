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

  console.log(metrics[curMetricIndex]);

  timeReceiver.setPageLoadingTime(metrics[curMetricIndex].metrics, command.url);

  this.open(command.url, command.opts);
}).run();

casper.then(function () {
  console.log('METRICS', JSON.stringify(metrics));
});

//@TODO make eachThen instead of this
/*testedPagesUrl.forEach(function (urlEl, urlIndex) {
 (function (urlEl) {
 casper.then(function () {
 const url = urlEl.url || urlEl,
 urlRegex = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
 pageUri = url
 .match(urlRegex)[5]
 .substring(1),
 metricIndex = loadingMetrics.push({
 pageName: urlEl.alias || pageUri,
 timestamp: new Date().getTime(),
 metrics: {}
 }) - 1;

 LoadTest.setPageLoadingTime(loadingMetrics[metricIndex].metrics, url, this);
 });
 })(urlEl);
 });*/

