/**@module logger*/

const casper = window.casper;

/**
 * Init progress module
 *
 * @param {Number} commandsNum Number of commands
 */
exports.progress = function (commandsNum) {
  casper.on('resource.requested', function () {

  });

  casper.on('resource.recieved', function () {

  });
};
