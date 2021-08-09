// loader本质上是一个函数
module.exports = function (content, map, meta) {
  console.log(content);
  return content;
};
