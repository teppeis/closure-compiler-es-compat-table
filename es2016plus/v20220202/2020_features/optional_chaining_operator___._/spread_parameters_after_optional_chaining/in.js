// 2020 features / optional chaining operator (?.) / spread parameters after optional chaining
module.exports = () => {
var fn = null;
var n = null;
var o = {};
return fn?.(...[], 1) === void undefined && fn?.(...[], ...[]) === void undefined && o.method?.(...[], 1) === void undefined && n?.method(...[], 1) === void undefined;

};