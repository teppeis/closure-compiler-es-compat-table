// built-in extensions / Array.prototype methods / Array.prototype.findIndex
module.exports = function() {
  var arr = [{name: 'foo'}];
  var target = {name: 'bar'};
  arr.push(target);
  arr.push({name: 'baz'});
  var obj = {};
  return arr.findIndex(function(el, idx, ar) {
    return el.name === 'bar' && idx === 1 && this === obj;
  }, obj) === 1;
};
