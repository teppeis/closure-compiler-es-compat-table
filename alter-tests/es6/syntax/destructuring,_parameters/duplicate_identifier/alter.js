// syntax / destructuring, parameters / duplicate identifier
module.exports = () => {
  var d = function d([d]) { return d };
  if (d([true]) !== true) return false;
  var f = function f([id, id]) { return id };
};

// EXPECT: 5: ERROR - [JSC_DUPLICATE_PARAM] Parse error. Duplicate parameter name "id"
