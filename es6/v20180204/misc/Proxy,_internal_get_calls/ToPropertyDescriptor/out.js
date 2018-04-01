module.exports = function() {
  var a = [], d = new Proxy({enumerable:!0, configurable:!0, value:!0, writable:!0, get:Function(), set:Function()}, {get:function(b, c) {
    a.push(c);
    return b[c];
  }});
  try {
    Object.defineProperty({}, "foo", d);
  } catch (b) {
    return "enumerable,configurable,value,writable,get,set" === a + "";
  }
};

