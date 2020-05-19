// proposal (stage 1) / Object iteration / Object.iterateValues
module.exports = () => {
  const object = { a: 1, b: 2, c: 3 };
  const iterator = Object.iterateValues(object);
  if (typeof iterator[Symbol.iterator] !== 'function' || typeof iterator.next !== 'function') return false;
  delete object.b;
  return [...iterator].join() === '1,3';

};