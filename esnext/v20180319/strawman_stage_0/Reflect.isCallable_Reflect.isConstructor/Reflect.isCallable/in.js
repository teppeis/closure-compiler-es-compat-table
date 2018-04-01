// strawman (stage 0) / Reflect.isCallable / Reflect.isConstructor / Reflect.isCallable
module.exports = function() {
return Reflect.isCallable(function(){})
          && Reflect.isCallable(_ => _)
          && !Reflect.isCallable(class {});
      
};