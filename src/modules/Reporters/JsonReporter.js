import Reporter from './Reporter';
import fs from 'fs';

/**
 * JSON reporter class
 *
 */
class JsonReporter extends Reporter {
  /**
   * Initialize reporter
   *
   * @param {Object} metrics Metrics
   * @param {Object|Undefined} options Reporter options
   */
  constructor(metrics, options) {
    super(metrics, options);

    this._reportSuccessMsg = '';// Add msg
    this._reportFailMsg = ''; // Add msg
  }

  /**
   * Write json report to file
   */
  report() {

    const jsonReport = JSON.stringify(this._metrics);

    try {
      fs.write('./zait_report.json', jsonReport, 'w');

      this.reportStatus = true;
    } catch (e) {
      this.reportStatus = false;

      this._reportFailMsg = e.message;
    }
  }
}

export default JsonReporter;
