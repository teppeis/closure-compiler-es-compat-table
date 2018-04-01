// proposal (stage 1) / Frozen Realms API
module.exports = function() {
  return (
    typeof Reflect.Realm.immutableRoot === "function" &&
    typeof Reflect.Realm.prototype.spawn === "function"
  );
};
