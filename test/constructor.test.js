var redis_info = require('../');

var info = "redis_version:2.4.10\nredis_git_sha1:00000000\nredis_git_dirty:0\narch_bits:64\nmultiplexing_api:kqueue\ngcc_version:4.2.1\nprocess_id:3961\nuptime_in_seconds:681311\nuptime_in_days:7\nlru_clock:8233\nused_cpu_sys:45.19\nused_cpu_user:59.74\nused_cpu_sys_children:0.15\nused_cpu_user_children:0.73\nconnected_clients:4\nconnected_slaves:0\nclient_longest_output_list:0\nclient_biggest_input_buf:0\nblocked_clients:0\nused_memory:15080416\nused_memory_human:14.38M\nused_memory_rss:21258240\nused_memory_peak:18985904\nused_memory_peak_human:18.11M\nmem_fragmentation_ratio:1.41\nmem_allocator:libc\nloading:0\naof_enabled:0\nchanges_since_last_save:0\nbgsave_in_progress:0\nlast_save_time:1341952654\nbgrewriteaof_in_progress:0\ntotal_connections_received:1501\ntotal_commands_processed:8325\nexpired_keys:0\nevicted_keys:0\nkeyspace_hits:2554\nkeyspace_misses:0\npubsub_channels:2\npubsub_patterns:0\nlatest_fork_usec:851\nvm_enabled:0\nrole:master\ndb0:keys=27012,expires=18\ndb15:keys=1,expires=0";

exports['constructor'] = function(t){
  t.expect(1);


  var parser = redis_info.parse(info);

  t.equal(parser.info.length, 45);

  t.done();
};

exports['.databases'] = function(t){
  t.expect(1);

  var parser = redis_info.parse(info);

  t.deepEqual(parser.databases, [{ index: 0, keys: 27012, expires: 18 }, { index: 15, keys: 1, expires: 0 }]);

  t.done();
};

exports['_parseDatabaseInfo'] = function(t){
  var parser = redis_info.parse(info);
  t.expect(4);

  t.deepEqual(parser._parseDatabaseInfo('db10', ''), {index: 10, keys: 0, expires: 0});
  t.deepEqual(parser._parseDatabaseInfo('db20', 'keys=10'), {index: 20, keys: 10, expires: 0});
  t.deepEqual(parser._parseDatabaseInfo('db10', 'expires=20'), {index: 10, keys: 0, expires: 20});
  t.deepEqual(parser._parseDatabaseInfo('db0', 'keys=27012,expires=18'), {index: 0, keys: 27012, expires: 18});

  t.done();
};


exports['.startWith'] = function(t){
  t.expect(2);

  var parser = redis_info.parse(info);

  t.deepEqual(parser.startWith('used_'), [ [ 'used_cpu_sys', '45.19' ],[ 'used_cpu_user', '59.74' ],[ 'used_cpu_sys_children', '0.15' ],[ 'used_cpu_user_children', '0.73' ],[ 'used_memory', '15080416' ],[ 'used_memory_human', '14.38M' ],[ 'used_memory_rss', '21258240' ],[ 'used_memory_peak', '18985904' ],[ 'used_memory_peak_human', '18.11M' ] ]);
  t.equal(parser.startWith('used_').length, 9);

  t.done();
};


exports['.contains'] = function(t){
  t.expect(2);

  var parser = redis_info.parse(info);

  t.deepEqual(parser.contains('memory'), [ [ 'used_memory', '15080416' ],[ 'used_memory_human', '14.38M' ],[ 'used_memory_rss', '21258240' ],[ 'used_memory_peak', '18985904' ],[ 'used_memory_peak_human', '18.11M' ] ]);
  t.equal(parser.contains('memory').length, 5);

  t.done();
};
