// 2017 annex b / Proxy internal calls, getter/setter methods / __lookupGetter__
module.exports = function() {
  // Object.prototype.__lookupGetter__ -> [[GetOwnProperty]]
  // Object.prototype.__lookupGetter__ -> [[GetPrototypeOf]]
  var gopd = [];
  var gpo = false;
  var p = new Proxy(
    {},
    {
      getPrototypeOf: function(o) {
        gpo = true;
        return Object.getPrototypeOf(o);
      },
      getOwnPropertyDescriptor: function(o, v) {
        gopd.push(v);
        return Object.getOwnPropertyDescriptor(o, v);
      }
    }
  );
  Object.prototype.__lookupGetter__.call(p, "foo");
  return gopd + "" === "foo" && gpo;
};
