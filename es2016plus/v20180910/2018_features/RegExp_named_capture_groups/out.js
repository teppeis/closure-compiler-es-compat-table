module.exports = function() {
  var a = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec("2016-03-11");
  return "2016" === a.groups.year && "03" === a.groups.month && "11" === a.groups.day && "2016-03-11" === a[0] && "2016" === a[1] && "03" === a[2] && "11" === a[3];
};

