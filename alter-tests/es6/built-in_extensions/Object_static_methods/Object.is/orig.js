// built-in extensions / Object static methods / Object.is
module.exports = () => {
  return typeof Object.is === 'function' &&
Object.is(NaN, NaN) &&
!Object.is(-0, 0);

};