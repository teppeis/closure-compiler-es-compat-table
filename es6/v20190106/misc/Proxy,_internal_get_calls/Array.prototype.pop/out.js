module.exports = function() {
  var b = [], a = new Proxy([0, 1, 2, 3], {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Array.prototype.pop.call(a);
  return "length,3" === b + "";
};

