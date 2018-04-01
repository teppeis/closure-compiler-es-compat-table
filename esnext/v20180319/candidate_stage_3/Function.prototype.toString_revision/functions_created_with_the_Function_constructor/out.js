module.exports = function() {
  return "function anonymous(a, /* a */ b, c /* b */ //\n) {\n/* c */ ; /* d */ //\n}" === Function("a", " /* a */ b, c /* b */ //", "/* c */ ; /* d */ //") + "";
};

