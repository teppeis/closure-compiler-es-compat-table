// built-ins / Symbol / new Symbol() throws
module.exports = () => {
  var symbol = Symbol();
  try {
    new Symbol();
  } catch(e) {
    return true;
  }

};