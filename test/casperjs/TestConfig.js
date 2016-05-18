const configModule = require('../src/modules/config.js'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('Configuration handler', function () {
  let casper = {},
      config;
  
  before(function () {
    casper = {
      cli: {
      },
      _cliArgumentsStorage: {
        parser: undefined,
        file: undefined
      }
    };
    
    casper.cli.get = sinon.stub();
    
    casper.cli.get
      .withArgs('parser')
      .returns(casper._cliArgumentsStorage.parser)
      .withArgs('file')
      .returns(casper._cliArgumentsStorage.file);
    
    config = configModule.config(casper);
  });
  
  //@TODO add dynamic file creation and moving
  describe('Get raw file', function () {
    it('should return raw file', function () {
      const confFile = config.raw;
      
      console.log(config)
      
      assert.isString(conf);
    });
  });
});