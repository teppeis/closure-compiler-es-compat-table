// arrow functions
module.exports = function () {
    try {
      var a = () => 5;;
    } catch (e) {
      return false;
    }
    return true;
  }