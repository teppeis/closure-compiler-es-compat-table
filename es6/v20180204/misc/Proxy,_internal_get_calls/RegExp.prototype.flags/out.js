module.exports = function() {
  var b = [], a = new Proxy({}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get.call(a);
  return "global,ignoreCase,multiline,unicode,sticky" === b + "";
};

