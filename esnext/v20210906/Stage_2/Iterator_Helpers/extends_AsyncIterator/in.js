// Stage 2 / Iterator Helpers / extends AsyncIterator
module.exports = () => {
  class Class extends AsyncIterator { }
  const instance = new Class();
  return instance[Symbol.asyncIterator]() === instance;

};