/**
 * Reporter interface
 */
class Reporter {
  /**
   * Initialize reporter
   *
   * @param {Object} metrics
   * @param {Object} options
   */
  constructor(metrics, options) {
    this.reportStatus = undefined;

    this._metrics = metrics;
    this._options = options;
    this._reportSuccessMsg = undefined;
    this._reportFailMsg = undefined;
  }

  /**
   * Report metrics method
   * @abstract
   */
  report() {
    throw Error('Field is not implemented');
  }

  /**
   * Returns info string for logging
   *
   * @returns {String}
   */
  get reportLog() {
    switch (this.reportLog) {
      case undefined:
        return 'Report status wasn\'t changed. Can not figure out report status.';
      case false:
        return this._reportSuccessMsg;
      case true:
        return this._reportFailMsg;
    }
  }
}

export default Reporter;
