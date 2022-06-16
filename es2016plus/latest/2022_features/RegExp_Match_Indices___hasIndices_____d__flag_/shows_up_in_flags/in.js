// 2022 features / RegExp Match Indices (`hasIndices` / `d` flag) / shows up in flags
module.exports = () => {
  var expected = ['hasIndices'];
  // Sorted alphabetically by shortname – "dgimsuy".
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