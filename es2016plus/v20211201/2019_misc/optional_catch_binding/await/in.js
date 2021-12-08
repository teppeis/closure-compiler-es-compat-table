// 2019 misc / optional catch binding / await
module.exports = (asyncTestPassed) => {
(async function (){
try {
await Promise.reject();
}
catch {
asyncTestPassed();
}
})();

};