// misc / Proxy, internal 'set' calls / Array.prototype.reverse
module.exports = function() {
  // Array.prototype.reverse -> Set -> [[Set]]
  var set = [];
  var p = new Proxy([0, 0, 0, ,], {
    set: function(o, k, v) {
      set.push(k);
      o[k] = v;
      return true;
    }
  });
  p.reverse();
  return set + "" === "3,1,2";
};
