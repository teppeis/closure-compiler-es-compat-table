module.exports = function() {
  var c = [], a = new Proxy({length:2, 0:"", 1:""}, {get:function(a, b) {
    c.push(b);
    return a[b];
  }});
  a = new Proxy({raw:a}, {get:function(a, b) {
    c.push(b);
    return a[b];
  }});
  String.raw(a);
  return "raw,length,0,1" === c + "";
};

