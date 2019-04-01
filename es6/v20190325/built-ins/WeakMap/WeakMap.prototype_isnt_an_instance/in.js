// built-ins / WeakMap / WeakMap.prototype isn't an instance
module.exports = () => {
  new WeakMap();
  var obj = {};
  try {
    WeakMap.prototype.has(obj);
  }
  catch(e) {
    return true;
  }

};