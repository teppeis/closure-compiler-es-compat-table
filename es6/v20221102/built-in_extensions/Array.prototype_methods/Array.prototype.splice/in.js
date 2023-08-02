// built-in extensions / Array.prototype methods / Array.prototype.splice
module.exports = () => {
  if ([0, 1, 2].splice(0).length !== 3) {
    // IE <= 8 and other pre-ES6 engines fail this check
    return false;
  }
  var a = [1, 2];
  var result = a.splice();
  if (a.length !== 2 || result.length !== 0) {
    // Safari 5.0 has this bug
    return false;
  }
  var obj = {};
  Array.prototype.splice.call(obj, 0, 0, 1);
  if (obj.length !== 1) {
    return false;
  }
  var spliceWorksWithLargeSparseArrays = (function () {
    // Per https://github.com/es-shims/es5-shim/issues/295
    // Safari 7/8 breaks with sparse arrays of size 1e5 or greater
    var arr = new Array(1e5);
    // note: the index MUST be 8 or larger or the test will false pass
    arr[8] = 'x';
    arr.splice(1, 1);
    for (var i = 0; i < arr.length; i += 1) {
      if (arr[i] === 'x') {
        return i === 7;
      }
    }
    return false;
  }());
  var spliceWorksWithSmallSparseArrays = (function () {
    // Per https://github.com/es-shims/es5-shim/issues/295
    // Opera 12.15 breaks on this, no idea why.
    var n = 256;
    var arr = [];
    arr[n] = 'a';
    arr.splice(n + 1, 0, 'b');
    return arr[n] === 'a';
  }());
  return spliceWorksWithLargeSparseArrays && spliceWorksWithSmallSparseArrays;

};