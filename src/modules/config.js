const fs = require('fs');
const parser = require('./parser.js');

/**
 * @namespace Configuration handling
 *
 * @param {Object} casper CasperJS instance
 */
exports.config = function (casper) {
  return {
    _confParser: (function () { //@TODO make parser auto detect(by file extension)
      const confParser = casper.cli.get('parser') || 'json';

      return confParser
        .toLowerCase()
        .trim();
    })(),

    _file: undefined,

    get raw() {
      if (!this._file) {
        let configPath = casper.cli.get('file') || 'pageload.json' ||
        'pageload.yml';
        let conf = fs.read(configPath.trim());

        this._file = conf; //narrow place(memory)

        return conf;
      } else {
        return this._file;
      }
    },

    get parsedConfig() {
      switch (this._confParser) {
      case 'json':
        return JSON.parse(this.raw);
      case 'yml':
        return;
      default:
        throw new Error('There is no parser for this file.'); //@TODO make custom errors
      }
    },

    get parsedCommands() {
      return parser.json.parseCommands(this.parsedConfig.commands);
    },

    get reporter() {
      return this.parsedConfig;
    }
  };

};
