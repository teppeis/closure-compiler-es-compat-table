// functions / generators / yield *, astral plane strings
module.exports = function() {
var iterator = (function * generator() {
          yield * "𠮷𠮶";
        }());
        var item = iterator.next();
        var passed = item.value === "𠮷" && item.done === false;
        item = iterator.next();
        passed    &= item.value === "𠮶" && item.done === false;
        item = iterator.next();
        passed    &= item.value === undefined && item.done === true;
        return passed;
      
};