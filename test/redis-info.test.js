'use strict';
var t = require('chai').assert;
var redis_info = require('../');
var fix = require('./fixtures');


describe('redis-info', function () {
  describe('.parse', function () {
    it('should be an info str', function (done) {
      var parser = redis_info.parse(fix.info);
      t.equal(parser._info.length, 45);
      done();
    });

    describe('.fields', function () {
      it('should returns every fields', function (done) {
        var parser = redis_info.parse(fix.info + fix.info_cmds);
        t.deepEqual(parser.fields, fix.parsed_info_output);
        done();
      });

      it('should return an empty DB if the database keys are not defined', function (done) {
        var parser = redis_info.parse("db0\r\n");
        t.deepEqual(parser.fields.databases, {
          '0': {
            keys: 0,
            expires: 0
          }
        });
        done();
      });
    });
  });
});


// exports['_parseDatabaseInfo'] = function (t) {
//   var parser = redis_info.parse(fix.info);
//   t.expect(4);

//   t.deepEqual(parser._parseDatabaseInfo('db10', ''), {
//     index: 10,
//     keys: 0,
//     expires: 0
//   });
//   t.deepEqual(parser._parseDatabaseInfo('db20', 'keys=10'), {
//     index: 20,
//     keys: 10,
//     expires: 0
//   });
//   t.deepEqual(parser._parseDatabaseInfo('db10', 'expires=20'), {
//     index: 10,
//     keys: 0,
//     expires: 20
//   });
//   t.deepEqual(parser._parseDatabaseInfo('db0', 'keys=27012,expires=18'), {
//     index: 0,
//     keys: 27012,
//     expires: 18
//   });

//   done();
// };
