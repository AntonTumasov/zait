const casper = window.casper;
const fs = require('fs');
const commandBuilder = require('./commandBuilder');
const ymljs = undefined;

const confParser = (function () { //@TODO make parser auto detect(by file extension)
  const confParser = casper.cli.get('parser') || 'json';

  return confParser
    .toLowerCase()
    .trim();
})();

/**@module parser*/
module.exports = {
  /**
   * Get rawConfig configuration file
   *
   * @type {String}
   */
  get rawConfig() {
    let configPath = casper.cli.get('file') || 'pageload.json' ||
      'pageload.yml';
    let conf = fs.read(configPath.trim());

    return conf;
  },

  /**
   * Get parsed config file
   *
   * @throws {Error} Throw error if there is no commandBuilder for a file.
   * @type {JSON}
   */
  get parsedConfig() {
    switch (confParser) {
      case 'json':
        return JSON.parse(this.rawConfig);
      case 'yml':
        return null;
      default:
        throw new Error('There is no commandBuilder for this file.'); //@TODO make custom errors
    }
  },

  /**
   * Get parsed commands
   *
   * @type {Array}
   */
  get parsedCommands() {
    return commandBuilder.buildCommands(this.parsedConfig.commands);
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

