module.exports = function() {
  var b = [], a = new Proxy([0, 1, 2, 3], {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Array.prototype.splice.call(a, 1, 1);
  Array.prototype.splice.call(a, 1, 0, 1);
  return "length,constructor,1,2,3,length,constructor,2,1" === b + "";
};

