// built-in extensions / Array.prototype methods / Array.prototype.find
module.exports = () => {
  var arr = [{name: 'foo'}];
  var target = {name: 'bar'};
  arr.push(target);
  arr.push({name: 'baz'});
  var obj = {};
  return arr.find(function(el, idx, ar) {
    return el.name === 'bar' && idx === 1 && this === obj;
  }, obj) === target;
};
