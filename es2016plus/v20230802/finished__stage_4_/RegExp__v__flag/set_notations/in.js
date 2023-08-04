// finished (stage 4) / RegExp `v` flag / set notations
module.exports = () => {
return /[\p{ASCII}&&\p{Decimal_Number}]/v.test("0")
&& /[\p{Any}--[\x01-\u{10ffff}]]/v.test("\0")

};