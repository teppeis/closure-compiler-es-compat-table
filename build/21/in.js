// RegExp "y" flag
module.exports = function() {

    var re = new RegExp('\\w');
    var re2 = new RegExp('\\w', 'y');
    re.exec('xy');
    re2.exec('xy');
    return (re.exec('xy')[0] === 'x' && re2.exec('xy')[0] === 'y');
  
};