/**@module TimeReceiver*/

/**
 *
 * Time receiver class
 *
 * @constructor
 *
 * @param {Object} casper Casper instance
 *
 */
export default function TimeReceiver(casper) {
  this.casper = casper;

  /**
   * Set page loading time
   *
   * @param {String} url Url of page
   * @param {Object} metricsObjRef Reference for metrics object where metrics
   * will be set
   */
  this.setPageLoadingTime = function (metricsObjRef, url) {
    let startTime;
    let endTime;

    casper = this.casper;

    /**
     * Request handler to set start time of page loading
     *
     * @inner
     */
    function requestHandler(resource) {
      startTime = new Date().getTime();

      casper.removeListener('page.resource.requested', requestHandler);
    }

    /**
     * Receive handler to set end time of page loading
     * and clearing.
     *
     * @inner
     */
    function receiveHandler() {
      endTime = new Date().getTime();

      metricsObjRef.loadTime = endTime - startTime;

      casper.removeListener('page.resource.received', receiveHandler);
    }

    /**
     * @todo Add jsdoc for events events
     */
    casper.on('page.resource.requested', requestHandler);
    casper.on('page.resource.received', receiveHandler);
  };
}

