const casper = window.casper;
const fs = require('fs');
const parser = require('./parser');
const ymljs = undefined;

const confParser = (function () { //@TODO make parser auto detect(by file extension)
  const confParser = casper.cli.get('parser') || 'json';

  return confParser
    .toLowerCase()
    .trim();
})();

/**@module config*/
module.exports = {
  /**
   * Get raw configuration file
   *
   * @type {String}
   */
  get raw() {
    let configPath = casper.cli.get('file') || 'pageload.json' ||
      'pageload.yml';
    let conf = fs.read(configPath.trim());

    return conf;
  },

  /**
   * Get parsed config file
   *
   * @throws {Error} Throw error if there is no parser for a file.
   * @type {JSON}
   */
  get parsedConfig() {
    switch (confParser) {
      case 'json':
        return JSON.parse(this.raw);
      case 'yml':
        return null;
      default:
        throw new Error('There is no parser for this file.'); //@TODO make custom errors
    }
  },

  /**
   * Get parsed commands
   *
   * @type {Array}
   */
  get parsedCommands() {
    return parser.parseCommands(this.parsedConfig.commands);
  },

  /**
   * Get reporter
   *
   * @type {Object}
   */
  get report() {
    return this.parsedConfig;
  }
};

