// 2019 features / Array.prototype.{flat, flatMap} / flat and flatMap in Array.prototype[@@unscopables]
module.exports = () => {
  return Array.prototype[Symbol.unscopables].flat
&& Array.prototype[Symbol.unscopables].flatMap;

};