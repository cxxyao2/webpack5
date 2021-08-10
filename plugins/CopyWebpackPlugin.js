const globby = require('globby');
const webpack = require('webpack');

const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const { validate } = require('schema-utils');
const readFile = promisify(fs.readFile);
const { RawSource } = webpack.sources;

const schema = require('./schema.json');

class CopyWebpackPlugin {
  constructor(options = {}) {
    // 验证options是否符合规范
    validate(schema, options, {
      name: 'CopyWebpackPlugin',
    });

    this.options = options;
  }

  apply(compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
      //添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync(
        'CopyWebpackPlugin',
        async (cb) => {
          // 将from中的资源赋值到to中,输出
          const { from, ignore } = this.options;
          const to = this.options.to ? this.options.to : '.';
          // 1, 读取from中所有资源

          // context就是webpack配置
          // 运行指令的目录
          const context = compiler.options.context; // process.cwd()
          // 将输入路径变成绝对路径
          const absoluteFrom = path.isAbsolute(from)
            ? from
            : path.resolve(from);

          // 1 过滤掉ignore这个数组中的文件
          // globby(要处理的文件夹,options)
          const paths = await globby(absoluteFrom, { ignore });
          console.log(paths);

          // 2, 过滤ignore中的文件
          const files = await Promise.all(
            paths.map(async (absolutePath) => {
              // 读取文件
              const data = await readFile(absolutePath);
              // basename得到最后的文件名称
              const relativePath = path.basename(absolutePath);

              // 和to属性结合
              // 没有to --> reset.css
              // 有to --> css/reset.css
              const filename = path.join(to, relativePath);

              return {
                // 文件数据
                data,
                //文件名称
                filename,
              };
            })
          );

          // 3, 生成webpack格式的文件
          const assets = files.map((file) => {
            const source = new RawSource(file.data);
            return { source, filename: file.filename };
          });

          // 4, 添加compilation中,output
          assets.forEach((asset) => {
            compilation.emitAsset(asset.filename, asset.source);
          });

          cb();
        }
      );
    });
  }
}

module.exports = CopyWebpackPlugin;
