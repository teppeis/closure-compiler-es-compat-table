// draft (stage 2) / Generator function.sent Meta Property
module.exports = function() {
var result;
    function* generator() {
      result = function.sent;
    }
    var iter = generator();
    iter.next('tromple');
    return result === 'tromple';
  
};