const fs = require('fs'),
  parser = require('./parser.js');

/**
 * @namespace Configuration handling
 * 
 * @param {Object} CasperJS instance
 */
exports.config = function (casper) {
  return {
    _confParser: (function () {
      const confParser = casper.cli.get('parser') || 'json';

      return confParser
        .toLowerCase()
        .trim();
    })(),
    _file: undefined,
    get raw() {
      if (!this._file) {
        let configPath = casper.cli.get('file') || 'pageload.json' ||
          'pageload.yml',
          conf = fs.read(configPath.trim());

        this._file = conf; //narrow place(memory)

        return conf;
      } else {
        return this._file;
      }
    },
    get parsed() {
      switch (this._confParser) {
      case 'json':
        return JSON.parse(this.raw);
      case 'yml':
        return;
      default:
        throw new Error('There is no parser for this file.'); //@TODO make custom errors
      }
    },
    get commands() {
      return this.parsed.commands;
    },
    get reporter() {
      return this.parsed.reporter;
    }
  }
};