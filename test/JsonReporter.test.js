import JsonReporter from '../src/modules/Reporters/JsonReporter';
import {assert} from 'chai';
import fs from 'fs';

describe('JSON reporter', function () {

  describe('report()', function () {
    let metrics;
    let options = {};

    before(function () {
      metrics = {
        some: 'Yeah',
        metrics: 'Baby',
        for_test: 'test me fully'
      };
    });

    beforeEach(function () {
      try {
        fs.statSync(options.report_path).isFile();
        fs.unlinkSync(options.report_path);
      } catch (e) {}
    });

    it('report file should exists', function () {
      options.report_path = './zait_report.json';

      const jsonReporter = new JsonReporter(metrics, options, 'test');

      jsonReporter.report();

      assert.isTrue(fs.statSync(options.report_path).isFile());
    });

    it('should throws error when it can\'t reports', function () {
      options.report_path = '/zait_doesn_is_not_allowed_here';

      const jsonReporter = new JsonReporter(metrics, options, 'test');

      jsonReporter.report();

      assert.throws(jsonReporter.report);

    });

    it('report status should be false(zero code)', function () {
      options.report_path = './zait_report.json';

      const jsonReporter = new JsonReporter(metrics, options, 'test');

      jsonReporter.report();

      assert.isFalse(jsonReporter.reportStatus);
    });

    it('report status should be true(non zero code)', function () {
      options.report_path = '/zait_doesn_is_not_allowed_here';

      const jsonReporter = new JsonReporter(metrics, options, 'test');

      jsonReporter.report();

      assert.isTrue(jsonReporter.reportStatus);
    });
  });
});
