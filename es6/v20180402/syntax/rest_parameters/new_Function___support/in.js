// syntax / rest parameters / new Function() support
module.exports = () => {
  throw new Error('eval() and Function() cannot be transpiled');
  return new Function("a", "...b",
    "return b instanceof Array && a+b === 'foobar,baz';"
  )('foo','bar','baz');

};