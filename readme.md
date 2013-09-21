Redis-info [![Build Status](https://secure.travis-ci.org/FGRibreau/node-redis-info.png)](http://travis-ci.org/FGRibreau/node-redis-info) [![Gittip](http://badgr.co/gittip/fgribreau.png)](https://www.gittip.com/fgribreau/)
======================

Overview
--------

 Redis info string parser

Npm
------------

```bash
npm install redis-info
```

Usage
--------
```
> var info = require('redis-info').parse("redis_version:2.4.10\nredis_git_sha1:00000000\nredis_git_dirty:0\narch_bits:64\n ...");
undefined
> info.databases
[ { index: 0,
    keys: 27012,
    expires: 18 },
  { index: 15, keys: 1, expires: 0 } ]
> info.fields.redis_version
2.4.10
> info.fields.redis_git_dirty
0
> info.startWith('pubsub')
[ [ 'pubsub_channels', '2' ],
  [ 'pubsub_patterns', '0' ] ]
> info.contains('memory')
[ [ 'used_memory', '15080416' ],
  [ 'used_memory_human', '14.38M' ],
  [ 'used_memory_rss', '21258240' ],
  [ 'used_memory_peak', '18985904' ],
  [ 'used_memory_peak_human', '18.11M' ] ]
```

License
-------
Copyright (c) 2012 Francois-Guillaume Ribreau (npm@fgribreau.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
