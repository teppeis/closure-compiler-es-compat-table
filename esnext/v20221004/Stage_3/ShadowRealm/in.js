// Stage 3 / ShadowRealm
module.exports = () => {
  return typeof ShadowRealm === "function"
&& ["evaluate", "importValue"].every(function(key){
  return key in ShadowRealm.prototype;
});

};