// syntax / template literals / passed array is frozen
module.exports = function() {
  return (function(parts) {
    return Object.isFrozen(parts) && Object.isFrozen(parts.raw);
  })`foo${0}bar${0}baz`;
};
