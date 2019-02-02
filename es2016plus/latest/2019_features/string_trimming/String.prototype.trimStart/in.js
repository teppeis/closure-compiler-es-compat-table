// 2019 features / string trimming / String.prototype.trimStart
module.exports = () => {
  return ' \t \n abc   \t\n'.trimStart() === 'abc   \t\n';

};