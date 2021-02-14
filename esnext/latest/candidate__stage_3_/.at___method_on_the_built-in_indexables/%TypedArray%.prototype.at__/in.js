// candidate (stage 3) / .at() method on the built-in indexables / %TypedArray%.prototype.at()
module.exports = () => {
  return [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
  ].every(function (TypedArray) {
    var Constructor = globalThis[TypedArray];
    if (typeof Constructor !== 'function') {
      return false;
    }
    var arr = new Constructor([1, 2, 3]);
    return arr.at(0) === 1
&& arr.at(-3) === 1
&& arr.at(1) === 2
&& arr.at(-2) === 2
&& arr.at(2) === 3
&& arr.at(-1) === 3
&& arr.at(3) === undefined
&& arr.at(-4) === undefined;
  });

};