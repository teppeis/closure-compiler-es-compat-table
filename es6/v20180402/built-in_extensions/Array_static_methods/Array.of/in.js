// built-in extensions / Array static methods / Array.of
module.exports = function() {
  return typeof Array.of === "function" && Array.of(2)[0] === 2;
};
