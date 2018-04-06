// 2018 features / s (dotAll) flag for regular expressions
module.exports = function() {
  const regex = /foo.bar/s;
  return regex.test('foo\nbar');

};