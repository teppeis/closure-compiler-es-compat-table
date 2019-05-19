// syntax / template literals / TemplateStrings permanent caching
module.exports = () => {
// Safari 12 caches TemplateStrings using a GC-able "CodeBlock".
// But TemplateStrings are supposed to always be identical! When the
// CodeBlock is reclaimed, the TemplateStrings' identity is broken.
// Thankfully, [[Call]] vs [[Construct]] generate different CodeBlocks,
// which exposes the broken behavior.
// https://bugs.webkit.org/show_bug.cgi?id=190756
  function strings(array) {
    return array;
  }
  function getStrings() {
    return strings`foo`;
  }
  var original = getStrings();
  var newed = new getStrings();
  return original === getStrings() && original === newed;

};