import Parser from '../src/modules/parser';
import {assert} from 'chai';


describe('Configuration handler', function () {

  let config;
  
  before(function () {
    config = {
      commands: [
        {
          GET: {
            url: 'http://google.com'
          }
        },
        {
          GET: {
            url: 'http://mail.ru'
          }
        },
        {
          GET: {
            url: 'http://yandex.ru'
          }
        }
      ]
    };
  });

  describe('Get parsedConfig', function () {

    it('should return object when parser is json', function () {
      const parser = new Parser('json', config);
      
      assert.isObject(parser.parsedConfig);
    });

    it('should throws error when parser does not exist', function () {
      const parser = new Parser('nonexistenparser', config);

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
