module.exports = function() {
  var a = [], b = new Proxy(Function(), {get:function(b, c) {
    a.push(c);
    return b[c];
  }});
  ({}) instanceof b;
  return a[0] === Symbol.hasInstance && "prototype" === a.slice(1) + "";
};

