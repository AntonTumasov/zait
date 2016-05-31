/**
 * Time reciever class
 *
 * @constructor
 *
 * @param Object Casper implementation
 *
 */
function TimeReciever(casper) {
  this.casper = casper;

  /**
   * Set page loading time
   *
   * @param {String} url Url of page
   * @param {Object} metricsObjRef Reference for metrics object where metrics
   * will be setted
   */
  this.setPageLoadingTime = function (metricsObjRef, url) {
    let startTime,
      endTime,
      pageName;

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

    return casper.then(function () {
      /**
       * @todo Добавить комментарии для event'ов
       */
      casper.on('page.resource.requested', requestHandler);
      casper.on('page.resource.received', receiveHandler);

      if (url) {
        casper.open(url);
      }
    });
  };
}

exports.LoadTimeReciever = LoadTimeReciever;

