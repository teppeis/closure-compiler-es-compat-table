// misc / miscellaneous / RegExp.prototype.toString generic and uses "flags" property
module.exports = function() {
  return (
    RegExp.prototype.toString.call({ source: "foo", flags: "bar" }) ===
    "/foo/bar"
  );
};
