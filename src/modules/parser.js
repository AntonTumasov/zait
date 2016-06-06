/**@module parser*/

import commandBuilder from './commandBuilder';
import fs from 'fs';

const casper = window.casper;
const ymljs = undefined;

const parser = {
  get confParser() { //@TODO make parser auto detect(by file extension)
    const confParser = casper.cli.get('parser') || 'json';

    return confParser
      .toLowerCase()
      .trim();
  },
  /**
   * Get rawConfig configuration file
   *
   * @type {String}
   */
  get rawConfig() {
    let configPath = casper.cli.get('file') || `pageload.${this.confParser}`;
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
    switch (this.confParser) {
      case 'json':
        return JSON.parse(this.rawConfig);
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

export default parser;
