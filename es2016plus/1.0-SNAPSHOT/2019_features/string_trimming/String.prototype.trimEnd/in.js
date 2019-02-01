// 2019 features / string trimming / String.prototype.trimEnd
module.exports = () => {
  return ' \t \n abc   \t\n'.trimEnd() === ' \t \n abc';

};