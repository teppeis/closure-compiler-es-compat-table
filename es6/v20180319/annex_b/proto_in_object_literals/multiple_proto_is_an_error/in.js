// annex b / __proto__ in object literals / multiple __proto__ is an error
module.exports = function() {
  try {
    eval("({ __proto__ : [], __proto__: {} })");
  } catch (e) {
    return true;
  }
};
