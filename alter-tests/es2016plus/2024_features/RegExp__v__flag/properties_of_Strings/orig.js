// 2024 features / RegExp `v` flag / properties of Strings
module.exports = () => {
return /^\p{Emoji_Keycap_Sequence}$/v.test("*\uFE0F\u20E3")
&& !/^\p{Emoji_Keycap_Sequence}$/v.test("*");

};