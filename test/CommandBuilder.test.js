import commandBuilder from '../src/modules/commandBuilder';
import {assert} from 'chai';

describe('JSON commandBuilder', function () {
  describe('buildCommand', function () {
    it('should return object when string argument pass', function () {
      const url = 'http://example.com',
        parsedCommand = commandBuilder.buildCommand(url);

      assert.isObject(parsedCommand);
    });

    it('should return default object when string argument pass', function () {
      const url = 'http://example.com',
        parsedCommand = commandBuilder.buildCommand(url);

      assert.deepProperty(parsedCommand, 'opts.method');
      assert.property(parsedCommand, 'url');
    });

    it('should return default object with GET method', function () {
      const url = 'http://example.com',
        parsedCommand = commandBuilder.buildCommand(url);

      assert.deepPropertyVal(parsedCommand, 'opts.method', 'GET');
    });

    it('should return default object with defined url method', function () {
      const url = 'http://example.com',
        parsedCommand = commandBuilder.buildCommand(url);

      assert.isDefined(parsedCommand.url);
    });

    it('should return command object with method, headers, body(data) and url', function () {
      const command = {
          GET: {
            url: 'http://example.com',
            headers: {
              Accept: 'application/json'
            },
            data: {
              test1: 1,
              test2: 2
            }
          }
        },
        parsedCommand = commandBuilder.buildCommand(command);

      assert.property(parsedCommand, 'url');
      assert.deepProperty(parsedCommand, 'opts.headers');
      assert.deepProperty(parsedCommand, 'opts.method');
      assert.deepProperty(parsedCommand, 'opts.data');
    });

    it('should return command object with POST request method', function () {
      const command = {
          POST: {
            data: {
              test1: 1,
              test2: 2
            }
          }
        },
        parsedCommand = commandBuilder.buildCommand(command);

      assert.deepPropertyVal(parsedCommand, 'opts.method', 'POST');
    });
  });

  describe('buildCommands', function () {
    it('should return array of default objects when array of string argument pass', function () {
      const urls = ['http://example4.com', 'http://example3.com', 'http://example2.com', 'http://example1.com'],
        parsedCommands = commandBuilder.buildCommands(urls);

      assert.isArray(parsedCommands);
      parsedCommands.forEach(assert.isObject);
    });

    it('should return array which has length of 4', function () {
      const urls = ['http://example4.com', 'http://example3.com', 'http://example2.com', 'http://example1.com'],
        parsedCommands = commandBuilder.buildCommands(urls);

      assert.lengthOf(parsedCommands, 4);
    });

    it('should return array of objects when array of string argument pass', function () {
      const urls = ['http://example4.com', 'http://example3.com', 'http://example2.com', 'http://example1.com'],
        parsedCommands = commandBuilder.buildCommands(urls);

      assert.isArray(parsedCommands);
      parsedCommands.forEach(assert.isObject);
    });

    it('should return array of default objects when array of objects and strings argument pass', function () {
      const urls = [
          {
            GET: {
              url: 'http://example.com'
            }
          },
          {
            POST: {
              url: 'http://example.com',
              data: {
                test1: 1,
                test2: 2
              }
            }
          },
          'http://example.com'
        ],
        parsedCommands = commandBuilder.buildCommands(urls);

      assert.isArray(parsedCommands);
      parsedCommands.forEach(assert.isObject);
    });
  });
});
