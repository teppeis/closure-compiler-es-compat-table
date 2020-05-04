// draft (stage 2) / Iterator Helpers / instanceof AsyncIterator
module.exports = () => {
  return (async function*() {})() instanceof AsyncIterator;

};