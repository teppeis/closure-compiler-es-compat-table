// candidate (stage 3) / string trimming / String.prototype.trimRight
module.exports = () => {
  return ' \t \n abc   \t\n'.trimRight() === ' \t \n abc';

};