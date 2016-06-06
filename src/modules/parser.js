/**@module parser*/

import commandBuilder from './commandBuilder';

const ymljs = undefined;

export default class Parser {

  constructor(confParser, config) {
    this.confParser = confParser;
    this.config = config;
  }

  /**
   * Get parsed config file
   *
   * @throws {Error} Throw error if there is no commandBuilder for a file.
   * @type {JSON}
   */
  get parsedConfig() {
    switch (this.confParser) {
      case 'json':
        return JSON.parse(this.config);
      case 'yml':
        return null;
      default:
        throw new Error('There is no parser for this file.'); //@TODO make custom errors
    }
  }

  /**
   * Get parsed commands
   *
   * @type {Array}
   */
  get parsedCommands() {
    return commandBuilder.buildCommands(this.parsedConfig.commands);
  }

  /**
   * Get reporter
   *
   * @type {Object}
   */
  get report() {
    return this.parsedConfig;
  }
}

