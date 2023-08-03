// syntax / template literals / TemplateStrings call site caching
module.exports = () => {
// TemplateStrings caching was changed from per-contents to
// per-call-site.
// https://github.com/tc39/ecma262/pull/890
  function strings(array) {
    return array;
  }
  function getStrings() {
    return strings`foo`;
  }
  var original = getStrings();
  var other = strings`foo`;
  return original === getStrings() && original !== other;

};