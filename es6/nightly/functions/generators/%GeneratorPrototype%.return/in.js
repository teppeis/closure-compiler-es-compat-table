// functions / generators / %GeneratorPrototype%.return
module.exports = () => {
  function * generator(){
    yield 5; yield 6;
  };
  var iterator = generator();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.return("quxquux");
  passed &= item.value === "quxquux" && item.done === true;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;

};