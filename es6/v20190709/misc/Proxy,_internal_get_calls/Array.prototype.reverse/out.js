module.exports = function() {
  var b = [], a = new Proxy([0, , 2, , 4, , ], {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Array.prototype.reverse.call(a);
  return "length,0,4,2" === b + "";
};

