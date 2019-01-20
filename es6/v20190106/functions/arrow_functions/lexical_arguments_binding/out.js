module.exports = function() {
  return 5 === function() {
    var a = arguments;
    return function(b) {
      return a[0];
    };
  }(5)(6);
};

