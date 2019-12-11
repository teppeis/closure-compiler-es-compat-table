// 2020 features / nullish coalescing operator (??)
module.exports = () => {
return (null ?? 42) === 42 &&
(undefined ?? 42) === 42 &&
(false ?? 42) === false &&
('' ?? 42) === '' &&
(0 ?? 42) === 0 &&
isNaN(NaN ?? 42);

};