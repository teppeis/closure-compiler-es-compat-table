// Stage 3 / Error.cause property / SyntaxError has cause
module.exports = () => {
  var error = new SyntaxError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};