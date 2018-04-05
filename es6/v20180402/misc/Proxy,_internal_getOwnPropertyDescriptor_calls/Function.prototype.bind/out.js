module.exports = function() {
  var a = [];
  (new Proxy(Function(), {getOwnPropertyDescriptor:function(c, b) {
    a.push(b);
    return Object.getOwnPropertyDescriptor(c, b);
  }})).bind();
  return "length" === a + "";
};

