// built-ins / Map / constructor requires new
module.exports = function() {
  new Map();
  try {
    Map();
    return false;
  } catch(e) {
    return true;
  }

};