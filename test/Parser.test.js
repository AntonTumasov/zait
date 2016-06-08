import Parser from '../src/modules/Parser';
import {assert} from 'chai';

describe('Configuration handler', function () {

  let configJson;
  let configYml;

  before(function () {
    configJson = `{
      "commands": [
        {
          "GET": {
            "url": "http://google.com"
          }
        },
        {
          "GET": {
            "url": "http://mail.ru"
          }
        },
        {
          "GET": {
            "url": "http://yandex.ru"
          }
        }
      ]
    }`;
    configYml = `---
  commands: 
    - 
      GET: 
        url: "http://google.com"
    - 
      GET: 
        url: "http://mail.ru"
    - 
      GET: 
        url: "http://yandex.ru"`;
  });

  describe('Get parsedConfig', function () {

    it('should return object when parser is json', function () {
      const parser = new Parser('json', configJson);

      assert.isObject(parser.parsedConfig);
    });

    it('should return object when parser is yml', function () {
      const parser = new Parser('yml', configYml);

      assert.isObject(parser.parsedConfig);
    });

    it('should throws error when parser does not exist', function () {
      const parser = new Parser('nonexistenparser', configJson);

      let getterThrowsErr = false;

      try {
        parser.parsedConfig;
      } catch (e) {
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
      const parser = new Parser('json', configJson);

      assert.isArray(parser.parsedCommands);
    });
  });
});
