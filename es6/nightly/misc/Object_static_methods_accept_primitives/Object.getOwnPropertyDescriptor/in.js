// misc / Object static methods accept primitives / Object.getOwnPropertyDescriptor
module.exports = () => {
  return Object.getOwnPropertyDescriptor('a', 'foo') === void undefined;

};