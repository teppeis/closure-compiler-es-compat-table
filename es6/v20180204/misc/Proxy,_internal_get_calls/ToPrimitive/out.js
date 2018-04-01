module.exports = function() {
  var a = [], b = new Proxy({toString:Function()}, {get:function(b, c) {
    a.push(c);
    return b[c];
  }});
  b + 3;
  return a[0] === Symbol.toPrimitive && "valueOf,toString" === a.slice(1) + "";
};

