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
  constructor(metrics, options, env) {
    if (env === 'test') {
      fs.write = fs.writeFileSync;
    }

    super(metrics, options);

    this._options = options;
    this._reportSuccessMsg = '';// Add msg
    this._reportFailMsg = ''; // Add msg
  }

  /**
   * Write json report to file
   */
  report() {

    const jsonReport = JSON.stringify(this._metrics);

    try {
      fs.write(this._options.report_path, jsonReport);

      this.reportStatus = false;
    } catch (e) {
      this.reportStatus = true;

      this._reportFailMsg = e.message;
    }
  }
}

export default JsonReporter;
