casper.on('error', function (err) {
  this.log(err, 'error');
  this.exit(1);
});

const parser = require('../src/modules/parser');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('Configuration handler', function () {

  let cliArgumentsStorage;

  before(function () {
    cliArgumentsStorage = {
      parser: undefined,
      file: './test/files/pageload.json'
    };

    casper.cli.get = sinon.stub();

    casper.cli.get
      .withArgs('file')
      .returns(cliArgumentsStorage.file)
      .withArgs('parser')
      .returns(cliArgumentsStorage.parser);


    casper.start();
  });

  //@TODO add dynamic file creation and moving
  describe('Get rawConfig', function () {
    it('should return rawConfig string', function () {
      const confFile = parser.rawConfig;

      assert.isString(confFile);
    });
  });

  describe('Get parsedConfig', function () {
    afterEach(function () {
      casper.cli.get
        .withArgs('parser')
        .returns(cliArgumentsStorage.parser);
    });

    it('should return object when parser is not specified', function () {
      assert.isObject(parser.parsedConfig);
    });

    it('should return object when parser is json', function () {
      casper.cli.get
        .withArgs('parser')
        .returns('JSON');

      assert.isObject(parser.parsedConfig);
    });

    it('should throws error when parser does not exist', function () {
      casper.cli.get
        .withArgs('parser')
        .returns('some nonexistent parser name');

      let getterThrowsErr = false;

      try {
        parser.parsedConfig
      } catch(e) {
        getterThrowsErr = true;
      }

      assert.isTrue(getterThrowsErr, 'should throw error');
    });

    /*it('should return object when parser is yml', function () {
      assert.isObject(parser.parsedConfig);
    });*/
  });

  describe('Get parsed commands', function () {
    it('should returns array of commands', function () {
      assert.isArray(parser.parsedCommands);
    });
  });
});
