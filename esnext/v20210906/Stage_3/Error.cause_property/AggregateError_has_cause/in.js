// Stage 3 / Error.cause property / AggregateError has cause
module.exports = () => {
  var error = new AggregateError([], 'error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};