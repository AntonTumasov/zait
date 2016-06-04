casper.on('error', function (err) {
  this.log(err, 'error');
  this.exit(1);
});

const config = require('../src/modules/parser'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('Configuration handler', function () {

  let cliArgumentsStorage;

  before(function () {
    cliArgumentsStorage = {
      parser: undefined,
      file: './test/files/pageload.json'
    };

    casper.cli.get = sinon.stub();

    casper.cli.get
      .withArgs('commandBuilder')
      .returns(cliArgumentsStorage.parser)
      .withArgs('file')
      .returns(cliArgumentsStorage.file);

    casper.start();
  });

  //@TODO add dynamic file creation and moving
  describe('Get rawConfig file', function () {
    it('should return rawConfig file', function () {
      const confFile = config.rawConfig;

      assert.isString(confFile);
    });
  });
});
