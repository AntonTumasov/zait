import chalk from 'chalk';
import mdTable from 'markdown-table';

/**@namespace*/
export const message = {

  /**
   * Print standard message to console
   *
   * @param {String} msg Message for printing
   */
  print(msg) {
    console.log(msg);
  },

  /**
   * Print error message to console
   *
   * @param {String} msg Message for printing
   */
  err(msg) {
    console.error(chalk.red(msg));
  },

  /**
   * Print warning message to console
   *
   * @param {String} msg Message for printing
   */
  warn(msg) {
    console.warn(chalk.yellow(msg));
  },

  /**
   * Print success message to console
   *
   * @param {String} msg Message for printing
   */
  success(msg) {
    this.print(chalk.green(msg));
  },

  /**
   * Print markdown table to console
   *
   * @param {Array} table Table array
   * @param {Object} config Table configuration
   */
  table(table, config = { align: 'c' }) {
    this.print(mdTable(table, config));
  }
};

