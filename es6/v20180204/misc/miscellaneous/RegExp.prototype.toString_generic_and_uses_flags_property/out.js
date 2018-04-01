module.exports = function() {
  return "/foo/bar" === RegExp.prototype.toString.call({source:"foo", flags:"bar"});
};

