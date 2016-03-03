const ymljs = undefined,
  typeOf = require('typeof');

/**
 * @namespace JSON parser namespace
 */
exports.jsonParser = {
  /**
   * Parse a command to API kind
   * 
   * @param   {Object|String} cmd Command to parse
   * @returns {Object} Parsed command (if not parsed command was string 
   *                   object will make by default way)
   */
  parseCommand: function (cmd) {
    let parsedCmd = {};

    if (typeOf(cmd) === 'string') {
      parsedCmd.url = cmd;
      parsedCmd.method = 'GET';

      return parsedCmd;
    }

    parsedCmd.url = Object.keys(cmd)[0];

    for (let opt in cmd) {
      parsedCmd[opt] = cmd[opt];
    }

    return parsedCmd;
  },
  /**
   * Parse a commands to API kind
   * 
   * @param   {Array} cmd Commands to parse
   * @returns {Array} Array of parsed commands (if not parsed command was string 
   *                   object will make by default way)
   */
  parseCommands: function (cmds) {
    let parsedCmds = cmds.map(this.parseCommand);

    return parsedCmds;
  }
};

exports.ymlParser = {};