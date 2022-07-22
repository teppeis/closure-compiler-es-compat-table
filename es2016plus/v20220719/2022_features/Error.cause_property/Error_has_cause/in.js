// 2022 features / Error.cause property / Error has cause
module.exports = () => {
  var error = new Error('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};