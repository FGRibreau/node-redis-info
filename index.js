var _ = require('lodash');

function Parser(info){
  this._info = this._splitStr(info);

  Object.defineProperty(this, 'fields', {
    get: this.parseFields.bind(this)
  });

  Object.defineProperty(this, 'databases', {
    get: this.parseDatabases.bind(this)
  });

  Object.defineProperty(this, 'commands', {
    get: this.parseCommands.bind(this)
  });
}


function startWith(pattern){
  return function(value){
    return value.indexOf(pattern) === 0;
  };
}

function contains(pattern){
  return function(value){
    return value.indexOf(pattern) !== -1;
  };
}

function split(s){return function(v){return v.split(s);};};

function defstr(v){return v || '';}

function defint(v){return v || 0;}

function apply(func){
  return function(v){
    return func.apply(this, v);
  };
}

function takeN(func, n){return function(v){return func(v[n]);};}

function takeFirst(func){return takeN(func, 0);}

/**
 * Split the info string by \n and :
 * @param  {String} str the returned redis info
 * @return {Array}     Array of [key, value]
 */
Parser.prototype._splitStr = function(str){
  return str.split('\n').map(function(line){return line.trim().split(':');});
};

Parser.prototype.parseDatabases = function(){
  if(this._databases){return this._databases;}
  return this._databases = this._info
    .filter(takeFirst(startWith('db')))
    .map(apply(this._parseDatabaseInfo));
};

Parser.prototype.parseCommands = function(){
  if(this._commands){return this._commands;}
  return _.zipObject(this._commands = this._info
    .filter(function(a){return a[0].indexOf('cmdstat_') === 0;})
    .map(apply(this._parseCommands)));
};

Parser.prototype._parseCommands = function(v, a){
  var val = _.zipObject(a.split(',').map(split('=')));
  if(_.has(val, 'calls')){val.calls = parseInt(val.calls, 10);}
  if(_.has(val, 'usec')){val.usec = parseInt(val.usec, 10);}
  if(_.has(val, 'usec_per_call')){val.usec_per_call = parseFloat(val.usec_per_call, 10);}
  return [v.split('_')[1], val];
};



Parser.prototype.parseFields = function() {
  if(this._fields){return this._fields;}

  return this._fields = this._info.reduce(function(m, v){
    m[v[0]] = v[1];
    return m;
  }, {});
};

Parser.prototype._parseDatabaseInfo = function(dbName, value) {
  var values = value.split(',');

  function extract(param){
    return parseInt(defint(defstr(_.detect(values, startWith(param))).split('=')[1]), 10);
  }

  return {
    index  : parseInt(dbName.substr(2), 10)
  , keys   : extract('keys')
  , expires: extract('expires')
  };
};


/**
 * Return all info properties that start with "pattern"
 * @param  {String} pattern the pattern
 * @return {Array}  an array of [key, value]
 */
Parser.prototype.startWith = function(pattern){
  return this._info.filter(takeFirst(startWith(pattern)));
};

/**
 * Return all info properties that contains "pattern"
 * @param  {String} pattern the pattern
 * @return {Array}  an array of [key, value]
 */
Parser.prototype.contains = function(pattern){
  return this._info.filter(takeFirst(contains(pattern)));
};

module.exports = {
  parse: function(info){
    return new Parser(info);
  }
};
