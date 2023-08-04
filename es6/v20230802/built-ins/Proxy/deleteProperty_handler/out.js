module.exports = function() {
  var a = {}, b = !1;
  delete (new Proxy(a, {deleteProperty:function(c, d) {
    b = c === a && "foo" === d;
  }})).foo;
  return b;
};

