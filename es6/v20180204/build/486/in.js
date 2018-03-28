// Array static methods: Array.from map function, instances of iterables
module.exports = function() {
var iterable = global.__createIterableObject(["foo", "bar", "bal"]);
        return Array.from(Object.create(iterable), function(e, i) {
          return e + this.baz + i;
        }, { baz: "d" }) + '' === "food0,bard1,bald2";
      
};
$jscomp.initSymbolIterator();