module.exports = function() {
var str = 'a => b';
return eval('(' + str + ')') + '' === str;

};