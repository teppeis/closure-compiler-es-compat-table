// finished (stage 4) / RegExp `v` flag / shows up in flags
module.exports = () => {
  var flags = [];
  var p = new Proxy({}, { get: function(o, k) { flags.push(k); return o[k]; }});
  Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(p);
  return flags.indexOf("unicodeSets") !== -1;

};