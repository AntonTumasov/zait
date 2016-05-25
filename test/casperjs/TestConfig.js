casper.on('error', function (err) {
      this.log(err, 'error');
      this.exit(1);
});

const configModule = require('../src/modules/config.js'),
  assert = require('chai').assert,
  sinon = require('sinon');

describe('Configuration handler', function () {

  let cliArgumentsStorage,
    config;
  
  before(function () {
    cliArgumentsStorage = {
        parser: undefined,
        file: './build/test/pageload.json' 
    };

    casper.cli.get = sinon.stub();
    
    casper.cli.get
      .withArgs('parser')
      .returns(cliArgumentsStorage.parser)
      .withArgs('file')
      .returns(cliArgumentsStorage.file);
    
    config = configModule.config(casper);
    casper.start();
  });
  
  //@TODO add dynamic file creation and moving
  describe('Get raw file', function () {
    it('should return raw file', function () {
      const confFile = config.raw;
      
      assert.isString(confFile);
    });
  });
});
