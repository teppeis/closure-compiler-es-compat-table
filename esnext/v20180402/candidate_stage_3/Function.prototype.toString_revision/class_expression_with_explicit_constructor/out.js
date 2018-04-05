module.exports = function() {
  return "class /* a */ A /* b */ extends /* c */ function B(){} /* d */ { /* e */ constructor /* f */ ( /* g */ ) /* h */ { /* i */ ; /* j */ } /* k */ m /* l */ ( /* m */ ) /* n */ { /* o */ } /* p */ }" === eval("(/* before */class /* a */ A /* b */ extends /* c */ function B(){} /* d */ { /* e */ constructor /* f */ ( /* g */ ) /* h */ { /* i */ ; /* j */ } /* k */ m /* l */ ( /* m */ ) /* n */ { /* o */ } /* p */ }/* after */)") + "";
};

