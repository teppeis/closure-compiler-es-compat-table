module.exports = function() {
  var a = new Proxy(Object.preventExtensions(Object.defineProperty({a:1}, "b", {value:1})), {ownKeys:function() {
    return ["a", "a", "b", "b"];
  }});
  return "a,a,b,b" === Object.getOwnPropertyNames(a) + "";
};

