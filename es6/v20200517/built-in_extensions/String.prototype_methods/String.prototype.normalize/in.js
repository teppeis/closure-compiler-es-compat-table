// built-in extensions / String.prototype methods / String.prototype.normalize
module.exports = () => {
  return 'c\u0327\u0301'.normalize('NFC') === '\u1e09'
    && '\u1e09'.normalize('NFD') === 'c\u0327\u0301';
};
