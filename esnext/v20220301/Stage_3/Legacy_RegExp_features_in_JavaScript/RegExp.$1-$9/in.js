// Stage 3 / Legacy RegExp features in JavaScript / RegExp.$1-$9
module.exports = () => {
function () {
for (var i = 1; i < 10; i++) {
if (!(('$' + i) in RegExp)) return false;
}
return true;
}
};