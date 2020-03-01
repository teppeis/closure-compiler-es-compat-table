// syntax / rest parameters / basic functionality
module.exports = () => {
  return (function (foo, ...args) {
    return args instanceof Array && args + "" === "bar,baz";
  }("foo", "bar", "baz"));

};