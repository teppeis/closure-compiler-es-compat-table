// candidate (stage 3) / string trimming / String.prototype.trimEnd
module.exports = () => {
  return ' \t \n abc   \t\n'.trimEnd() === ' \t \n abc';

};