// 2023 features / Array find from last / Array.prototype.findLast
module.exports = () => {
  var arr = [{ x: 1 }, { x: 2 }, { x: 1 }, { x: 2 }];
  return arr.findLast(function (o) { return o.x === 1; }) === arr[2];

};