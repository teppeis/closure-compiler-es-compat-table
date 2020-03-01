// candidate (stage 3) / Legacy RegExp features in JavaScript / RegExp "lastMatch"
module.exports = () => {
function () {
var re = /\w/;
re.exec('x');
return RegExp.lastMatch === 'x';
}
};