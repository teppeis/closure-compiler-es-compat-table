// built-ins / Set / Set.prototype isn't an instance
module.exports = () => {
  new Set();
  var obj = {};
  try {
    Set.prototype.has(obj);
  }
  catch(e) {
    return true;
  }

};