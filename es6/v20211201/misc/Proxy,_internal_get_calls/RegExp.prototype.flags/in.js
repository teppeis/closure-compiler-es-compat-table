// misc / Proxy, internal 'get' calls / RegExp.prototype.flags
module.exports = () => {
// RegExp.prototype.flags -> Get -> [[Get]]
  var expected = [];
  // Sorted alphabetically by shortname – "gimsuy".
  if ('global' in RegExp.prototype) expected.push('global');
  if ('ignoreCase' in RegExp.prototype) expected.push('ignoreCase');
  if ('multiline' in RegExp.prototype) expected.push('multiline');
  if ('dotAll' in RegExp.prototype) expected.push('dotAll');
  if ('unicode' in RegExp.prototype) expected.push('unicode');
  if ('sticky' in RegExp.prototype) expected.push('sticky');
  var actual = [];
  var p = new Proxy({}, { get: function(o, k) { actual.push(k); return o[k]; }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);
  if (expected.length !== actual.length) return false;
  for (var i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) return false;
  }
  return true;

};