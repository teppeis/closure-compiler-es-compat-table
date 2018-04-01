module.exports = function() {
  try {
    eval("({ __proto__ : [], __proto__: {} })");
  } catch (a) {
    return !0;
  }
};

