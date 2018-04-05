// misc / Updated identifier syntax / no escaped reserved words as identifiers
module.exports = function() {
  var a;
  try {
    eval("var v\\u0061r");
  } catch (e) {
    return true;
  }
};
