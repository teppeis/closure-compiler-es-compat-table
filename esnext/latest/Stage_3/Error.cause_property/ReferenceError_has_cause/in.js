// Stage 3 / Error.cause property / ReferenceError has cause
module.exports = () => {
  var error = new ReferenceError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};