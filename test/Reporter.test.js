import Reporter from '../src/modules/Reporters/Reporter';
import {assert} from 'chai';

describe('Reporter', function () {
  let reporter;

  before(function () {
    reporter = new Reporter();
  });

  describe('reportLog', function () {
    it('should return standard message, when report status is undefined', function () {
      assert.strictEqual('Report status wasn\'t changed or it wasn\'t run. Can not figure out report status.', reporter.reportLog);
    });

    it('should return Fail, when report status is 1', function () {
      reporter.reportStatus = true;

      assert.strictEqual('Fail', reporter.reportLog);
    });

    it('should return Success, when report status is 0', function () {
      reporter.reportStatus = false;

      assert.strictEqual('Success', reporter.reportLog);
    });
  });

  describe('report()', function () {
    it('should throws error because it is not implemented.', function () {
      assert.throws(reporter.report, 'Field is not implemented');
    });
  });
});
