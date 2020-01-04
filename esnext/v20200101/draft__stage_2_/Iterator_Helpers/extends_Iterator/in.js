// draft (stage 2) / Iterator Helpers / extends Iterator
module.exports = () => {
  class Class extends Iterator { }
  const instance = new Class();
  return instance[Symbol.iterator]() === instance;

};