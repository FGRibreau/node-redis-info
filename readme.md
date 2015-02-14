Redis-info [![Build Status](https://drone.io/github.com/FGRibreau/node-redis-info/status.png)](https://drone.io/github.com/FGRibreau/node-redis-info/latest)[![Deps](https://david-dm.org/FGRibreau/node-redis-info.png)](https://david-dm.org/FGRibreau/node-redis-info)
[![Version](http://badge.fury.io/js/redis-info.png)](https://david-dm.org/FGRibreau/check-build)

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
> info.redis_version
2.4.10
> info.redis_git_dirty
0
```

## Donate
[Donate Bitcoins](https://coinbase.com/checkouts/fc3041b9d8116e0b98e7d243c4727a30)

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
