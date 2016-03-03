const fs = require('fs');

exports.config = {
  _file: undefined,
  get file() {
    if (!this._file) {
      const configPath = casper.cli.get('config') || 'pageload.json',
        parsedConf = JSON.parse(fs.read(configPath));

      this._file = parsedConf;

      return parsedConf;
    } else {
      return this._file;
    }
  },
  get commands() {
    return this.get.commands;
  },
  get messaging() {

  }
};