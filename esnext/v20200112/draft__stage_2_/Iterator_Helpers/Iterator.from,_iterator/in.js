// draft (stage 2) / Iterator Helpers / Iterator.from, iterator
module.exports = () => {
  const iterator = Iterator.from({
    i: 0,
    next() {
      return { value: ++this.i, done: this.i > 3 };
    }
  });
  return 'next' in iterator
&& iterator instanceof Iterator
&& Array.from(iterator).join() === '1,2,3';

};