module.exports = function() {
var str = 'function \\u0061(\\u{62}, \\u0063) { \\u0062 = \\u{00063}; return b; }';
return eval('(/\x2A before \x2A/' + str + '/\x2A after \x2A/)') + '' === str;

};