// 2017 features / String padding / String.prototype.padEnd
module.exports = function() {
return 'hello'.padEnd(10) === 'hello     '
         && 'hello'.padEnd(10, '1234') === 'hello12341'
         && 'hello'.padEnd() === 'hello'
         && 'hello'.padEnd(6, '123') === 'hello1'
         && 'hello'.padEnd(3) === 'hello'
         && 'hello'.padEnd(3, '123') === 'hello';
         
};