// candidate (stage 3) / string trimming / String.prototype.trimLeft
module.exports = () => {
  return ' \t \n abc   \t\n'.trimLeft() === 'abc   \t\n';

};