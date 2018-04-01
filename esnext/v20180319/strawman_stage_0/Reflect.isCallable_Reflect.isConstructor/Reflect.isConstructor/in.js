// strawman (stage 0) / Reflect.isCallable / Reflect.isConstructor / Reflect.isConstructor
module.exports = function() {
  return (
    Reflect.isConstructor(function() {}) &&
    !Reflect.isConstructor(_ => _) &&
    Reflect.isConstructor(class {})
  );
};
