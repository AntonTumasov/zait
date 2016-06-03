/**
 * @namespace Progress bar and info module
 *
 * @param {Object} casper Casper instance
 * @param {Number} commandsNum Number of commands
 */
exports.progress = function (casper, commandsNum) {
  casper.on('resource.requested', function () {

  });

  casper.on('resource.recieved', function () {

  });
};
