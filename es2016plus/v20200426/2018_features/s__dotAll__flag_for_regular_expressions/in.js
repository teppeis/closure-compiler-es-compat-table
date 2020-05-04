// 2018 features / s (dotAll) flag for regular expressions
module.exports = () => {
  const regex = /foo.bar/s;
  return regex.test('foo\nbar');

};