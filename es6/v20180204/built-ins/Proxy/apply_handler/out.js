module.exports = function() {
  var a = function() {
  }, b = !1, c = {method:new Proxy(a, {apply:function(d, e, f) {
    b = d === a && e === c && "foo,bar" === f + "";
  }})};
  c.method("foo", "bar");
  return b;
};

