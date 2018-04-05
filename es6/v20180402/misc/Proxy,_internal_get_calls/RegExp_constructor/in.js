// misc / Proxy, internal 'get' calls / RegExp constructor
module.exports = function() {
  // RegExp -> Get -> [[Get]]
  var get = [];
  var re = { constructor: null };
  re[Symbol.match] = true;
  var p = new Proxy(re, {
    get: function(o, k) {
      get.push(k);
      return o[k];
    }
  });
  RegExp(p);
  return (
    get[0] === Symbol.match && get.slice(1) + "" === "constructor,source,flags"
  );
};
