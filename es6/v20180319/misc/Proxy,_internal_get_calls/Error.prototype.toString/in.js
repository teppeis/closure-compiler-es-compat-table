// misc / Proxy, internal 'get' calls / Error.prototype.toString
module.exports = function() {
  // Error.prototype.toString -> Get -> [[Get]]
  var get = [];
  var p = new Proxy(
    {},
    {
      get: function(o, k) {
        get.push(k);
        return o[k];
      }
    }
  );
  Error.prototype.toString.call(p);
  return get + "" === "name,message";
};
