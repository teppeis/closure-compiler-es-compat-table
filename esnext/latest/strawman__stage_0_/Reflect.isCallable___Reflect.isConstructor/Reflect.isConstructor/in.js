// strawman (stage 0) / Reflect.isCallable / Reflect.isConstructor / Reflect.isConstructor
module.exports = () => {
  return Reflect.isConstructor(function(){})
&& !Reflect.isConstructor(_ => _)
&& Reflect.isConstructor(class {});

};