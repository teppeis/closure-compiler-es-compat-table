module.exports = function() {
  var a = [], b = new Proxy({toString:Function(), toISOString:Function()}, {get:function(b, c) {
    a.push(c);
    return b[c];
  }});
  Date.prototype.toJSON.call(b);
  return a[0] === Symbol.toPrimitive && "valueOf,toString,toISOString" === a.slice(1) + "";
};

