// built-in extensions / String.prototype methods / String.prototype.endsWith throws on RegExp
module.exports = () => {
  try {
    'a'.endsWith(/./);
  } catch(e) {
    return 'foobar'.endsWith('bar');
  }
};
