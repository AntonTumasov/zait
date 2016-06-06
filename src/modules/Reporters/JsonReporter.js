/**@module Reporters/JsonReporter*/

import Reporter from './Reporter';
import fs from 'fs';

export default class JSONReporter extends Reporter {
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