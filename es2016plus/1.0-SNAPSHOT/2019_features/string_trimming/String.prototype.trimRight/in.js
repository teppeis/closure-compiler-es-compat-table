// 2019 features / string trimming / String.prototype.trimRight
module.exports = () => {
  return ' \t \n abc   \t\n'.trimRight() === ' \t \n abc';

};