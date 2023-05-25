module.exports = function() {
  var a = [], d = new Proxy({}, {get:function(c, b) {
    a.push(b);
    return c[b];
  }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, "flags").get.call(d);
  return -1 !== a.indexOf("unicodeSets");
};

