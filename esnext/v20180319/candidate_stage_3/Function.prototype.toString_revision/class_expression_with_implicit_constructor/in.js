// candidate (stage 3) / Function.prototype.toString revision / class expression with implicit constructor
module.exports = function() {
var str = 'class A {}';
      return eval('(' + str + ')') + '' === str;
    
};