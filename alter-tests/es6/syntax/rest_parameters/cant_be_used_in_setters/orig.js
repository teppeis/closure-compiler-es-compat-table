module.exports = function() {
return (function (...args) {
try {
eval("({set e(...args){}})");
} catch(e) {
return true;
}
}());

};