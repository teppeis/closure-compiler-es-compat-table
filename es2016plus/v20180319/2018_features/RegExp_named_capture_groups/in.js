// 2018 features / RegExp named capture groups
module.exports = function() {
  var result = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec(
    "2016-03-11"
  );
  return (
    result.groups.year === "2016" &&
    result.groups.month === "03" &&
    result.groups.day === "11" &&
    result[0] === "2016-03-11" &&
    result[1] === "2016" &&
    result[2] === "03" &&
    result[3] === "11"
  );
};
