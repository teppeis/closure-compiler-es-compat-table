// built-ins / Reflect / Reflect.apply
module.exports = () => {
  return Reflect.apply(Array.prototype.push, [1,2], [3,4,5]) === 5;

};