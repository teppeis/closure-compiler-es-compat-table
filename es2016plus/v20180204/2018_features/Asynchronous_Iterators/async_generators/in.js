// 2018 features / Asynchronous Iterators / async generators
module.exports = function(asyncTestPassed) {
  async function*generator(){
    yield 42;
  }

  var iterator = generator();
  iterator.next().then(function(step){
    if(iterator[Symbol.asyncIterator]() === iterator && step.done === false && step.value === 42)asyncTestPassed();
  });

};