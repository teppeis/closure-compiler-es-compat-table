// proposal (stage 1) / Realms
module.exports = () => {
  return typeof Realm === "function"
&& ["eval", "global", "intrinsics", "stdlib", "directEval", "indirectEval", "initGlobal", "nonEval"].every(function(key){
  return key in Realm.prototype;
});

};