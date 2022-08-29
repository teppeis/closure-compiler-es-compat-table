// 2023 features / Array find from last / Array.prototype.findLastIndex
module.exports = () => {
  var arr = [{ x: 1 }, { x: 2 }, { x: 1 }, { x: 2 }];
  return arr.findLastIndex(function (o) { return o.x === 1; }) === 2;

};