module.exports = function() {
  var b = [], a = new Proxy(Function(), {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Function.prototype.bind.call(a);
  return "length,name" === b + "";
};

