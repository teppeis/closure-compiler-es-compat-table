// built-in extensions / Array static methods / Array.from map function, generator instances
module.exports = function() {
  var iterable = (function*(){ yield "foo"; yield "bar"; yield "bal"; }());
  return Array.from(iterable, function(e, i) {
    return e + this.baz + i;
  }, { baz: "d" }) + '' === "food0,bard1,bald2";

};