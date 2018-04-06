// built-ins / Symbol / JSON.stringify ignores symbol objects
module.exports = function() {
  var testSymbolObject = function (sym) {
    var object = { foo: sym };
    try {
      // some browsers throw a TypeError when setting symbol object keys.
      // this isn't part of this test, so, ignore it if so.
      object[sym] = 1;
    } catch (e) {} // some browsers throw a TypeError when setting symbol object keys.
    var array = [sym];
    return JSON.stringify(object) === '{"foo":{}}' && JSON.stringify(array) === '[{}]' && JSON.stringify(sym) === '{}';
  };
  var objSym = Object(Symbol());
  var symNoToJSON = Object(Symbol());
  Object.defineProperty(symNoToJSON, 'toJSON', { enumerable: false, value: null }); // ensure it overrides the prototype, but is not callable
  return testSymbolObject(objSym) && testSymbolObject(symNoToJSON);

};