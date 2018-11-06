module.exports = function() {
  return "function" === typeof Realm && "eval global intrinsics stdlib directEval indirectEval initGlobal nonEval".split(" ").every(function(a) {
    return a in Realm.prototype;
  });
};

