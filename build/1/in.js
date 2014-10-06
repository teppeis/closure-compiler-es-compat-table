// arrow functions
module.exports = function() {
function () {
    try {
      var a = () => 5;;
    } catch (e) {
      return false;
    }
    return true;
  }
};