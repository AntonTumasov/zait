/**@module Reporters/JsonReporter*/

const Reporter = require('./Reporter');

function JsonReporter() {
  /**
   * Report builder
   *
   * @param metrics {Object} Received metrics
   */
  this.buildReport = function (metrics) {
    return metrics;
  };

  this._reportType = 'json';
}

JsonReporter.prototype = Object.create(Reporter.prototype);

module.exports = JsonReporter;
