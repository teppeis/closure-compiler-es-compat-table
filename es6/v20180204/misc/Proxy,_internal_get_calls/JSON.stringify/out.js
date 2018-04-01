module.exports = function() {
  var b = [], a = new Proxy({}, {get:function(a, c) {
    b.push(c);
    return a[c];
  }});
  JSON.stringify(a);
  return "toJSON" === b + "";
};

