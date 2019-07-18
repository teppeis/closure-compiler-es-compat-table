// syntax / template literals / TemplateStrings permanent caching
module.exports = () => {
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