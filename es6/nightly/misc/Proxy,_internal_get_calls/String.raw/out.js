module.exports = function() {
  var b = [], d = new Proxy({length:2, 0:"", 1:""}, {get:function(c, a) {
    b.push(a);
    return c[a];
  }});
  d = new Proxy({raw:d}, {get:function(c, a) {
    b.push(a);
    return c[a];
  }});
  String.raw(d);
  return "raw,length,0,1" === b + "";
};

