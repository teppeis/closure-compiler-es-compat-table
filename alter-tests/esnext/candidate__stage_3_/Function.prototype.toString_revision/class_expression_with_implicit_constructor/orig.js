module.exports = function() {
var str = 'class A {}';
return eval('(' + str + ')') + '' === str;

};