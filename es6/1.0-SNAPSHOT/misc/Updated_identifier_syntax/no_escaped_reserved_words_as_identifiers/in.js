// misc / Updated identifier syntax / no escaped reserved words as identifiers
module.exports = () => {
  var \u0061;
  var v\u0061r;
  return false;
};

// EXPECT: 4: ERROR - Parse error. 'identifier' expected
