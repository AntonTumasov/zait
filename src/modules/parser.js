const ymljs = undefined,
  typeOf = require('typeof');

/**
 * @namespace JSON parser namespace
 */
exports.json = {
  /**
   * Parse a command to API kind
   * 
   * @param   {Object|String} cmd Command to parse
   * @returns {Object} Parsed command (if not parsed command was string 
   *                   object will make by default way)
   */
  parseCommand: function (cmd) {
    let parsedCmd = {},
        methodName;
    
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
      parsedCmd.opts[opt] = cmd[methodName][opt];
    }
    
    console.log(parsedCmd);

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

exports.yml = {};