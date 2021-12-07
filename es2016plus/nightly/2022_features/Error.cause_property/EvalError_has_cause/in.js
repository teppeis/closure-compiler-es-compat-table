// 2022 features / Error.cause property / EvalError has cause
module.exports = () => {
  var error = new EvalError('error', { cause: 'cause' })
  return error.hasOwnProperty('cause') && error.cause === 'cause';

};