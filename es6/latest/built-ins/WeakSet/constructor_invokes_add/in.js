// built-ins / WeakSet / constructor invokes add
module.exports = () => {
  var passed = false;
  var _add = WeakSet.prototype.add;
  WeakSet.prototype.add = function(v) {
    passed = true;
  };
  new WeakSet([ { } ]);
  WeakSet.prototype.add = _add;
  return passed;

};