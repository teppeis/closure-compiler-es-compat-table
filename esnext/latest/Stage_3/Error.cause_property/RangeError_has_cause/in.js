// Stage 3 / Error.cause property / RangeError has cause
module.exports = () => {
  var error = new RangeError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};