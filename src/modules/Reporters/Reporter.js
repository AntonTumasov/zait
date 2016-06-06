/**@module Repoters/Reporter*/

/**Reporter root class(interface)*/
export default class Reporter {

  /**
   * Initialize metrics
   *
   * @param metrics
   */
  constructor(metrics) {
    this.metrics = metrics;
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
