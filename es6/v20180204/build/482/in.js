// Array static methods: Array.from, instances of generic iterables
module.exports = function() {
var iterable = global.__createIterableObject([1, 2, 3]);
        return Array.from(Object.create(iterable)) + '' === "1,2,3";
      
};
$jscomp.initSymbolIterator();