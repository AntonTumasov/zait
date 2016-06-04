const typeOf = require('typeof');

/**@module commandBuilder*/
module.exports = {
  /**
   * Parse a command to API kind
   *
   * @param   {Object|String} cmd Command to parse
   * @returns {Object} Parsed command (if not parsed command was string
   *                   object will make by default way)
   */
  buildCommand: function (cmd) {
    let parsedCmd = {};
    let methodName;

    parsedCmd.opts = {};

    if (typeOf(cmd) === 'string') {
      parsedCmd.url = cmd;
      parsedCmd.opts.method = 'GET';

      return parsedCmd;
    }

    methodName = Object.keys(cmd)[0];

    parsedCmd.opts.method = methodName;
    parsedCmd.url = cmd[methodName].url;

    delete(cmd[methodName].url);

    for (let opt in cmd[methodName]) {
      /* istanbul ignore else */
      if (cmd[methodName].hasOwnProperty(opt)) {
        parsedCmd.opts[opt] = cmd[methodName][opt];
      }
    }

    return parsedCmd;
  },
  /**
   * Parse a commands to API kind
   *
   * @param   {Array} commands Commands to parse
   * @returns {Array} Array of parsed commands (if not parsed command was string
   *                   object will make by default way)
   */
  buildCommands: function (commands) {
    return commands.map(this.buildCommand);
  }
};
