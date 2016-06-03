/*const Promise = require('es6-promise'),
  influent = require('influent');

let influxData = loadingMetrics.pageLoading.map(function (measurement) {
  return {
    key: measurement.pageName,
    fields: measurement.metrics,
    timestamp: measurement.timestamp  
  };
});

influentClient = influent.createHttpClient({
  server: [
    {
      protocol: 'http',
      host: configJSON.influxHost,
      port: configJSON.influxPort
    }
  ],
  username: configJSON.influxUsername,
  password: configJSON.influxPassword,
  database: configJSON.influxDBName,
  precision: 'ms'
});

influentClient
  .then(function (client) {
    client
      .write(influxData);
  })
  .then(function () {
    casper.log('Metrics was sent', 'info');
  })
  .catch(function (e) {
    casper.log(e, 'error');
  });*/