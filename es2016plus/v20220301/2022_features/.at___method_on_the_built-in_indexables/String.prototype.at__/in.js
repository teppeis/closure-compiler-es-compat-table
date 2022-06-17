// 2022 features / .at() method on the built-in indexables / String.prototype.at()
module.exports = () => {
  var str = 'abc';
  return str.at(0) === 'a'
&& str.at(-3) === 'a'
&& str.at(1) === 'b'
&& str.at(-2) === 'b'
&& str.at(2) === 'c'
&& str.at(-1) === 'c'
&& str.at(3) === undefined
&& str.at(-4) === undefined;

};