// Stage 3 / .at() method on the built-in indexables / Array.prototype.at()
module.exports = () => {
  var arr = [1, 2, 3];
  return arr.at(0) === 1
&& arr.at(-3) === 1
&& arr.at(1) === 2
&& arr.at(-2) === 2
&& arr.at(2) === 3
&& arr.at(-1) === 3
&& arr.at(3) === undefined
&& arr.at(-4) === undefined;

};