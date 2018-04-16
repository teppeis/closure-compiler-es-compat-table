// built-ins / Promise / Promise.prototype isn't an instance
module.exports = () => {
  new Promise(function(){});
  try {
    Promise.prototype.then(function(){});
  } catch (e) {
    return true;
  }

};