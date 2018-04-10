// syntax / new.target / assignment is an early error
module.exports = function() {
  var passed = false;
  new function f() {
    passed = (new.target === f);
  }();
  new.target = function(){};
  return false;
};

// EXPECT: 7: Error
