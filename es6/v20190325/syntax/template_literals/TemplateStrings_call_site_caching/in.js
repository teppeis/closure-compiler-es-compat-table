// syntax / template literals / TemplateStrings call site caching
module.exports = () => {
// Safari 12 sometimes garbage collects the cached TemplateStrings,
// even when the call site is still alive.
// This is almost impossible to write a test case for, but we can test
// the general semantics.
// https://bugs.webkit.org/show_bug.cgi?id=190756
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