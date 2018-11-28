// candidate (stage 3) / Well-formed JSON.stringify
module.exports = () => {
  return JSON.stringify('\uDF06\uD834') === "\"\\udf06\\ud834\""
&& JSON.stringify('\uDEAD') === "\"\\udead\"";

};