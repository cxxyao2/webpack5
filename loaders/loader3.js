// loader本质上是一个函数

// 这是一个同步loader
// module.exports = function (content, map, meta) {
//   console.log(333);
//   return content;
// };

module.exports.pitch = function () {
  console.log('pitch 333');
};

// output:
// (base) Admins-MacBook-Air:webpack5 admin$ npx webpack
// pitch 111
// pitch 222
// pitch 333
// 333
// 222
// 111
