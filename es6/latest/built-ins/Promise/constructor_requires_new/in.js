// built-ins / Promise / constructor requires new
module.exports = function() {
  new Promise(function(){});
  try {
    Promise(function(){});
    return false;
  } catch(e) {
    return true;
  }

};