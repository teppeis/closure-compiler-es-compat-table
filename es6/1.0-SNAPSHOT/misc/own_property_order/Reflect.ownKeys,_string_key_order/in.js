// misc / own property order / Reflect.ownKeys, string key order
module.exports = () => {
  var obj = {
    2: true,
    0: true,
    1: true,
    ' ': true,
    9: true,
    D: true,
    B: true,
    '-1': true
  };
  obj.A = true;
  obj[3] = true;
  "EFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key){
    obj[key] = true;
  });
  Object.defineProperty(obj, 'C', { value: true, enumerable: true });
  Object.defineProperty(obj, '4', { value: true, enumerable: true });
  delete obj[2];
  obj[2] = true;
  return Reflect.ownKeys(obj).join('') === "012349 DB-1AEFGHIJKLMNOPQRSTUVWXYZC";

};