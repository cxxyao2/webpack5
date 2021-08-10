// loader本质上是一个函数

// 获取webpack.config.js 中给这个loader设置的options
const { getOptions } = require('loader-utils');

// 检查是否匹配事先设置好的规则
const { validate } = require('schema-utils');

const schema = require('./schema');

module.exports = function (content, map, meta) {
  // 获取options
  const options = getOptions(this);
  console.log(333, options);

  // 检查options是否合法
  validate(schema, options, { name: 'loader3' });
  
  return content;
};

module.exports.pitch = function () {
  console.log('pitch 333');
};
