// loader本质上是一个函数

// 异步Loader,推荐异步写法
module.exports = function (content, map, meta) {
  console.log(222);
  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 1000);
};

module.exports.pitch = function () {
  console.log('pitch 222');
};
