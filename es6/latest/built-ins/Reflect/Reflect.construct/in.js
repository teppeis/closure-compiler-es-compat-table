// built-ins / Reflect / Reflect.construct
module.exports = () => {
  return Reflect.construct(function(a, b, c) {
    this.qux = a + b + c;
  }, ["foo", "bar", "baz"]).qux === "foobarbaz";

};