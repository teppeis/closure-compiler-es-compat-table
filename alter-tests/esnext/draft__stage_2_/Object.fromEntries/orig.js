// draft (stage 2) / Object.fromEntries
module.exports = () => {
  var object = Object.fromEntries(new Map([['foo', 42], ['bar', 23]]));
  return object.foo === 42 && object.bar === 23;

};