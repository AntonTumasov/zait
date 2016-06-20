/**@module Reporters*/

import Reporter from './Reporter';
import fs from 'fs';

/**
 * JSON reporter class
 * @extends Reporter
 */
class JsonReporter extends Reporter {
  /**
   * Initialize reporter
   *
   * @param {Object} metrics Metrics
   * @param {Object|Undefined} options Reporter options
   * @param {String} env Get environment for testing TODO: DI required instead of
   */
  constructor(metrics, options = {}, env = 'prod') {
    if (env === 'test') {
      fs.write = fs.writeFileSync;
    }

    super(metrics, options);

    const defaultOptions = {
      report_path: './zait.report.yml'
    };

    this._options = Object.assign(defaultOptions, options);

    this._options = options;
  }

  /**
   * Write json report to file
   */
  report() {

    const jsonReport = JSON.stringify(this._metrics, null, 4);

    try {
      fs.write(this._options.report_path, jsonReport);

      this._reportSuccessMsg = `Success! JSON report was wrote in ${this._options.report_path}`;
      this.reportStatus = false;
    } catch (e) {
      this.reportStatus = true;

      this._reportFailMsg = e.message;
    }
  }
}

export default JsonReporter;
