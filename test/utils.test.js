import utils from '../src/modules/utils';
import {assert} from 'chai';

describe('Utils',  function () {
  describe('metricsToTable', function () {
    const metrics = [
      {
        url: 'domain.com',
        starttime: 1,
        endtime: 2,
        status: 'OK'
      },
      {},
      {}
    ];

    it('should returns array', function () {
      assert.isArray(utils.metricsToTable());
    });
  });
});