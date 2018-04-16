// built-ins / Reflect / Reflect.get
module.exports = () => {
  return Reflect.get({ qux: 987 }, "qux") === 987;

};