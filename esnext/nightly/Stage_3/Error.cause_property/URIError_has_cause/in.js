// Stage 3 / Error.cause property / URIError has cause
module.exports = () => {
  var error = new URIError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};