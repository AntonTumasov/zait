/**@module Reporters*/

import Reporter from './Reporter';
import json2yaml from 'json2yaml';
import fs from 'fs';

/**
 * YAML Reporter class
 * @extends Reporter
 */
class YamlReporter extends Reporter {
  /**
   * Initialize reporter
   *
   * @param {Object} metrics Metrics
   * @param {Object|Undefined} options Reporter options
   * @param {String} env Get environment for testing
   */
  constructor(metrics, options, env) {
    if (env === 'test') {
      fs.write = fs.writeFileSync;
    }

    super(metrics, options);

    this._options = options;
    this._reportSuccessMsg = '';
    this._reportFailMsg = '';
  }

  /**
   * Output YAML report file
   */
  report() {
    const yamlReport = json2yaml.stringify(this._metrics);

    try {
      fs.write(this._options.report_path, yamlReport);

      this._reportSuccessMsg = 'Success! YAML report was wrote in ./.';
      this.reportStatus = false;
    } catch (e) {
      this.reportStatus = true;

      this._reportFailMsg = 'Failed! ' + e.message;
    }
  }
}

export default YamlReporter;
