/**@module Repoters/Reporter*/

/**Reporter root class(interface)*/
export default class Reporter {

  /**
   * Initialize metrics
   *
   * @param {Object} metrics
   * @param {Object} options
   */
  constructor(metrics, options) {
    this.metrics = metrics;
    this.options = options;
  }

  /**
   * Report metrics method
   */
  static report() {
    throw Error('Field is not implemented');
  }

  /**
   * Returns info string for logging
   *
   * @returns {String}
   */
  get reportLog() {
    return this.metrics;
  }

}
