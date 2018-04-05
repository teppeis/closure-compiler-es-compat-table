// 2017 misc / Proxy "ownKeys" handler, duplicate keys for non-extensible targets (ES 2017 semantics)
module.exports = function() {
  var P = new Proxy(
    Object.preventExtensions(
      Object.defineProperty({ a: 1 }, "b", { value: 1 })
    ),
    {
      ownKeys: function() {
        return ["a", "a", "b", "b"];
      }
    }
  );
  return Object.getOwnPropertyNames(P) + "" === "a,a,b,b";
};
