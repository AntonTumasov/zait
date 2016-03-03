const casper = require('casper').Casper({
    verbose: true,
    logLevel: 'debug'
  }),
  config = require('modules/config.js').config;

casper.on('error', function (err) {
  this.log(err, 'error');
  this.exit(1);
});

casper.start('http://google.com');
casper.run();

/*
{
  method: 'GET',
  headers: {
  
  },
  data: {
  
  },
  url: ''
}
*/

//TODO make eachThen instead of this
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