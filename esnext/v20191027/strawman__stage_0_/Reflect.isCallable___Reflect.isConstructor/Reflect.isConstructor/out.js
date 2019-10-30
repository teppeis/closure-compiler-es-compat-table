module.exports = function() {
  var a;
  if (a = Reflect.isConstructor(function() {
  }) && !Reflect.isConstructor(function(a) {
    return a;
  })) {
    a = Reflect.isConstructor(function() {
    });
  }
  return a;
};

