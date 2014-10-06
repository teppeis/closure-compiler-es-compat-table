// __proto__ in object literals
module.exports = function () {
    var passed = { __proto__ : [] } instanceof Array
      && !({ __proto__ : null } instanceof Object);

    // If computed properties are supported, the following
    // check must also be passed.
    var a = "__proto__";
    try {
      eval("passed &= !({ [a] : [] } instanceof Array)");
    }
    catch(e) {}
    return passed;
  }