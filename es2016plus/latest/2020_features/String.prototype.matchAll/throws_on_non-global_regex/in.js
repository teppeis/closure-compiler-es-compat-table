// 2020 features / String.prototype.matchAll / throws on non-global regex
module.exports = () => {
  if (typeof String.prototype.matchAll !== 'function') return false;
  try {
    '11a2bb'.matchAll(/(\d)(\D)/);
  } catch (e) {
    return true;
  }

};