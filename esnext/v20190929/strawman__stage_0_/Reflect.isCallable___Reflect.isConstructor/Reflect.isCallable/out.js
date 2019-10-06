module.exports = function() {
  var a;
  if (a = Reflect.isCallable(function() {
  }) && Reflect.isCallable(function(a) {
    return a;
  })) {
    a = !Reflect.isCallable(function() {
    });
  }
  return a;
};

