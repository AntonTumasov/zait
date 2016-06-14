/**@module utlis*/
import chalk from 'chalk';

/**
 * Transform metrics to array table
 *
 * @param results Metrics to transform
 * @returns {Array} Array table
 */
export function metricsToTable(results) {
  const header = Object.keys(results[0]);
  let table = [];

  table.push(header);

  results.forEach(row => {
    let column = [];

    for (let colName in row) {
      if (row.hasOwnProperty(colName)) {
        let value = row[colName];

        switch (colName) {
          case 'status':
            if (value === 'OK') {
              value = chalk.green(value);
            } else {
              value = chalk.red(value);
            }

            column.push(value);
            break;
          default:
            column.push(value);
        }
      }

      table.push(column);
    }
  });

  return table;
}
