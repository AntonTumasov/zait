/**
 * Created by sergey on 09.06.16.
 */
import chalk from 'chalk';


class Message {

  /**
   * Print standard message to console
   *
   * @param {String} msg Message for print
   */
  print(msg){
    console.log(msg);
  };

  /**
   * Print error message to console
   *
   * @param {String} msg Message for print
   */
  error(msg){
    console.log(chalk.red.(msg));
  };

  /**
   * Print success message to console
   *
   * @param {String} msg Message for print
   */
  success(msg){
    console.log(chalk.green(msg));
  };

  /**
   * Print warning message to console
   *
   * @param {String} msg Message for print
   */
  warn(msg){
    console.log(chalk.yellow(msg));
  };
}