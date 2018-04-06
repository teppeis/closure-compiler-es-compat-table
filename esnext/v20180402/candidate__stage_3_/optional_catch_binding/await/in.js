// candidate (stage 3) / optional catch binding / await
module.exports = function(asyncTestPassed) {
(async function (){
try {
await Promise.reject();
}
catch {
asyncTestPassed();
}
})();

};