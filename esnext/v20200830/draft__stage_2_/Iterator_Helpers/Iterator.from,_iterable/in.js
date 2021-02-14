// draft (stage 2) / Iterator Helpers / Iterator.from, iterable
module.exports = () => {
  const iterator = Iterator.from([1, 2, 3]);
  return 'next' in iterator
&& iterator instanceof Iterator
&& Array.from(iterator).join() === '1,2,3';

};