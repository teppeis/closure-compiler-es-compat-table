module.exports = function() {
  return "function" === typeof Reflect.Realm.immutableRoot && "function" === typeof Reflect.Realm.prototype.spawn;
};

