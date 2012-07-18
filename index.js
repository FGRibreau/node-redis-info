var _ = require('lodash');


function Parser(info){
  this.info = this._splitStr(info);

  Object.defineProperty(this, 'databases', {
    get: this.parseDatabases.bind(this)
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

  return this._databases = this.info.filter(takeFirst(startWith('db'))).map(apply(this._parseDatabaseInfo));
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
  return this.info.filter(takeFirst(startWith(pattern)));
};

/**
 * Return all info properties that contains "pattern"
 * @param  {String} pattern the pattern
 * @return {Array}  an array of [key, value]
 */
Parser.prototype.contains = function(pattern){
  return this.info.filter(takeFirst(contains(pattern)));
};

module.exports = {
  parse: function(info){
    return new Parser(info);
  }
};
