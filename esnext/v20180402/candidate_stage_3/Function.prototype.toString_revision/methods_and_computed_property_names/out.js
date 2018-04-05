module.exports = function() {
  return '[ /* a */ "f" /* b */ ] /* c */ ( /* d */ ) /* e */ { /* f */ }' === eval('({ /* before */[ /* a */ "f" /* b */ ] /* c */ ( /* d */ ) /* e */ { /* f */ }/* after */ }.f)') + "";
};

