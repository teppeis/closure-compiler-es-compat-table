module.exports = function() {
  var a = [], c = new Proxy([0, 1, 2, 3], {get:function(d, b) {
    a.push(b);
    return d[b];
  }});
  Array.prototype.splice.call(c, 1, 1);
  Array.prototype.splice.call(c, 1, 0, 1);
  return "length,constructor,1,2,3,length,constructor,2,1" === a + "";
};

