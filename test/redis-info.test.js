'use strict';
var t = require('chai').assert;
var redis_info = require('../');
var fix = require('./fixtures');


describe('redis-info', function () {
  describe('.parse', function () {
    it('should parse an info str to an object', function (done) {
      var parser = redis_info.parse(fix.info + fix.info_cmds);
      t.deepEqual(parser, fix.parsed_info_output);
      done();
    });

    it('should return an empty DB if the database keys are not defined', function (done) {
      var parser = redis_info.parse("db0\r\n");
      t.deepEqual(parser.databases, {
        '0': {
          keys: 0,
          expires: 0
        }
      });
      done();
    });
  });
});
