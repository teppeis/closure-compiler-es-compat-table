// syntax / new.target / assignment is an early error
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  var passed = false;
  new function f() {
    passed = (new.target === f);
  }();
  try {
    Function("new.target = function(){};");
  } catch(e) {
    return passed;
  }

};