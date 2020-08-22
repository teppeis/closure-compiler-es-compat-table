// draft (stage 2) / `.item` method / Array.prototype.item
module.exports = () => {
  var arr = [1, 2, 3];
  return arr.item(0) === 1
&& arr.item(-3) === 1
&& arr.item(1) === 2
&& arr.item(-2) === 2
&& arr.item(2) === 3
&& arr.item(-1) === 3
&& arr.item(3) === undefined
&& arr.item(-4) === undefined;

};