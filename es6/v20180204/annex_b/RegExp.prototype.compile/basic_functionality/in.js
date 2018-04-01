// annex b / RegExp.prototype.compile / basic functionality
module.exports = function() {
if (typeof RegExp.prototype.compile !== 'function')
          return false
        var rx = /a/;
        rx.compile('b');
        return rx.test('b');
      
};