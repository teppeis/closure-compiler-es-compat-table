// misc / Proxy, internal 'get' calls / ToPrimitive
module.exports = function() {
  // ToPrimitive -> Get -> [[Get]]
  var get = [];
  var p = new Proxy(
    { toString: Function() },
    {
      get: function(o, k) {
        get.push(k);
        return o[k];
      }
    }
  );
  p + 3;
  return (
    get[0] === Symbol.toPrimitive && get.slice(1) + "" === "valueOf,toString"
  );
};
