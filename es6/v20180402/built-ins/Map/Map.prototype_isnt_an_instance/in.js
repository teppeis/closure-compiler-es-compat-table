// built-ins / Map / Map.prototype isn't an instance
module.exports = () => {
  new Map();
  var obj = {};
  try {
    Map.prototype.has(obj);
  }
  catch(e) {
    return true;
  }

};