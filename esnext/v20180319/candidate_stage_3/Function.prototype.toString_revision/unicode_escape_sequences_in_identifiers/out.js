module.exports = function() {
  return "function \\u0061(\\u{62}, \\u0063) { \\u0062 = \\u{00063}; return b; }" === eval("(/* before */function \\u0061(\\u{62}, \\u0063) { \\u0062 = \\u{00063}; return b; }/* after */)") + "";
};

