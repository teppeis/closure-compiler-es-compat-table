// Stage 2 / Array.isTemplateObject
module.exports = () => {
  return !Array.isTemplateObject([])
&& Array.isTemplateObject((it => it)`a${1}c`);

};