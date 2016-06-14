import chalk from 'chalk';

/**@namespace*/
const message = {

  /**
   * Print standard message to console
   *
   * @param {String} msg Message for printing
   */
  print: function (msg) {
    console.log(msg);
  },

  /**
   * Print error message to console
   *
   * @param {String} msg Message for printing
   */
  err: function (msg) {
    console.error(chalk.red(msg));
  },

  /**
   * Print warning message to console
   *
   * @param {String} msg Message for printing
   */
  warn: function (msg) {
    console.warn(chalk.yellow(msg));
  }
};

export default message;
