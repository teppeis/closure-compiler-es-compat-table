// draft (stage 2) / `.item` method / String.prototype.item
module.exports = () => {
  var str = 'abc';
  return str.item(0) === 'a'
&& str.item(-3) === 'a'
&& str.item(1) === 'b'
&& str.item(-2) === 'b'
&& str.item(2) === 'c'
&& str.item(-1) === 'c'
&& str.item(3) === undefined
&& str.item(-4) === undefined;

};