var redis_info = require('../');

var info = "# Server\n\n\nredis_version:2.4.10\nredis_git_sha1:00000000\nredis_git_dirty:0\narch_bits:64\nmultiplexing_api:kqueue\ngcc_version:4.2.1\nprocess_id:3961\nuptime_in_seconds:681311\nuptime_in_days:7\nlru_clock:8233\nused_cpu_sys:45.19\nused_cpu_user:59.74\nused_cpu_sys_children:0.15\nused_cpu_user_children:0.73\nconnected_clients:4\nconnected_slaves:0\nclient_longest_output_list:0\nclient_biggest_input_buf:0\nblocked_clients:0\nused_memory:15080416\nused_memory_human:14.38M\nused_memory_rss:21258240\nused_memory_peak:18985904\nused_memory_peak_human:18.11M\nmem_fragmentation_ratio:1.41\nmem_allocator:libc\nloading:0\naof_enabled:0\nchanges_since_last_save:0\nbgsave_in_progress:0\nlast_save_time:1341952654\nbgrewriteaof_in_progress:0\ntotal_connections_received:1501\ntotal_commands_processed:8325\nexpired_keys:0\nevicted_keys:0\nkeyspace_hits:2554\nkeyspace_misses:0\npubsub_channels:2\npubsub_patterns:0\nlatest_fork_usec:851\nvm_enabled:0\nrole:master\ndb0:keys=27012,expires=18\ndb15:keys=1,expires=0";
var info_2_6 = "redis_version:2.6.10\r\nredis_git_sha1:00000000\r\nredis_git_dirty:0\r\narch_bits:64\r\nmultiplexing_api:epoll\r\ngcc_version:4.4.5\r\nprocess_id:4094\r\nuptime_in_seconds:32\r\nuptime_in_days:0\r\nlru_clock:1474263\r\nused_cpu_sys:0.00\r\nused_cpu_user:0.05\r\nused_cpu_sys_children:0.00\r\nused_cpu_user_children:0.00\r\nconnected_clients:1\r\nconnected_slaves:0\r\nclient_longest_output_list:0\r\nclient_biggest_input_buf:0\r\nblocked_clients:0\r\nused_memory:846904\r\nused_memory_human:827.05K\r\nused_memory_rss:1679360\r\nused_memory_peak:846864\r\nused_memory_peak_human:827.02K\r\nmem_fragmentation_ratio:1.98\r\nmem_allocator:libc\r\nloading:0\r\naof_enabled:0\r\nchanges_since_last_save:0\r\nbgsave_in_progress:0\r\nlast_save_time:1377891405\r\nbgrewriteaof_in_progress:0\r\ntotal_connections_received:1\r\ntotal_commands_processed:2\r\nexpired_keys:0\r\nevicted_keys:0\r\nkeyspace_hits:0\r\nkeyspace_misses:0\r\npubsub_channels:0\r\npubsub_patterns:0\r\nlatest_fork_usec:0\r\nvm_enabled:0\r\nrole:master\r\ndb0:keys=13,expires=12\r\n";
var info_cmds = "# Commandstats\r\ncmdstat_set:calls=1,usec=15,usec_per_call=15.00\r\ncmdstat_lpush:calls=1,usec=14,usec_per_call=14.00\r\ncmdstat_zadd:calls=2,usec=84,usec_per_call=42.00\r\ncmdstat_hset:calls=1,usec=26,usec_per_call=26.00\r\ncmdstat_keys:calls=2,usec=91,usec_per_call=45.50\r\ncmdstat_info:calls=5,usec=807,usec_per_call=161.40\r\ncmdstat_ttl:calls=1,usec=6,usec_per_call=6.00\r\ncmdstat_slowlog:calls=4,usec=47,usec_per_call=11.75\r\n";

exports['constructor'] = function(t){
  t.expect(1);
  var parser = redis_info.parse(info);
  t.equal(parser._info.length, 45);
  t.done();
};

exports['.fields'] = function(t){
  t.expect(1);
  var parser = redis_info.parse(info + info_cmds);
  t.deepEqual(parser.fields, {
    redis_version: '2.4.10',
    redis_git_sha1: '00000000',
    redis_git_dirty: '0',
    arch_bits: '64',
    multiplexing_api: 'kqueue',
    gcc_version: '4.2.1',
    process_id: '3961',
    uptime_in_seconds: '681311',
    uptime_in_days: '7',
    lru_clock: '8233',
    used_cpu_sys: '45.19',
    used_cpu_user: '59.74',
    used_cpu_sys_children: '0.15',
    used_cpu_user_children: '0.73',
    connected_clients: '4',
    connected_slaves: '0',
    client_longest_output_list: '0',
    client_biggest_input_buf: '0',
    blocked_clients: '0',
    used_memory: '15080416',
    used_memory_human: '14.38M',
    used_memory_rss: '21258240',
    used_memory_peak: '18985904',
    used_memory_peak_human: '18.11M',
    mem_fragmentation_ratio: '1.41',
    mem_allocator: 'libc',
    loading: '0',
    aof_enabled: '0',
    changes_since_last_save: '0',
    bgsave_in_progress: '0',
    last_save_time: '1341952654',
    bgrewriteaof_in_progress: '0',
    total_connections_received: '1501',
    total_commands_processed: '8325',
    expired_keys: '0',
    evicted_keys: '0',
    keyspace_hits: '2554',
    keyspace_misses: '0',
    pubsub_channels: '2',
    pubsub_patterns: '0',
    latest_fork_usec: '851',
    vm_enabled: '0',
    role: 'master',
    databases:{
    '0': { keys: 27012, expires: 18 },
    '15': { keys: 1, expires: 0 }
    },
    commands:{
      set: { calls: 1, usec: 15, usec_per_call: 15 },
      lpush: { calls: 1, usec: 14, usec_per_call: 14 },
      zadd: { calls: 2, usec: 84, usec_per_call: 42 },
      hset: { calls: 1, usec: 26, usec_per_call: 26 },
      keys: { calls: 2, usec: 91, usec_per_call: 45.5 },
      info: { calls: 5, usec: 807, usec_per_call: 161.4 },
      ttl: { calls: 1, usec: 6, usec_per_call: 6 },
      slowlog: { calls: 4, usec: 47, usec_per_call: 11.75 }
    }
  });
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
