// 2022 features / Error.cause property / TypeError has cause
module.exports = () => {
  var error = new TypeError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};