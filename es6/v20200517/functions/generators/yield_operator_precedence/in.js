// functions / generators / yield operator precedence
module.exports = () => {
  var passed;
  function * generator(){
    passed = yield 0 ? true : false;
  };
  var iterator = generator();
  iterator.next();
  iterator.next(true);
  return passed;

};