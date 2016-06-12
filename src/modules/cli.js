/**
 * Created by sergey on 09.06.16.
 */
import chalk from 'chalk';

/**@namespace*/
const Message = {

  /**
   * Print standard message to console
   *
   * @param {String} msg Message for print
   */
  print: function (msg) {
    console.log(msg);
  },

  /**
   * Print error message to console
   *
   * @param {String} msg Message for print
   */
  err: function (msg) {
    console.log(chalk.red(msg));
  },

  /**
   * Print warning message to console
   *
   * @param {String} msg Message for print
   */
  warn: function (msg) {
    console.log(chalk.yellow(msg));
  }

};