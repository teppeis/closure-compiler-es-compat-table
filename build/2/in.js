// const
module.exports = function() {
function () {
    try {
      return (function () { const foobarbaz = 12; return typeof foobarbaz === "number"; }());
    } catch (e) {
      return false;
    }
  }
}