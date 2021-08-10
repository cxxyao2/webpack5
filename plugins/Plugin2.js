const fs = require('fs');
const util = require('util');
const path = require('path');

const webpack = require('webpack');
const { RawSource } = webpack.sources;
// 将fs, readFile方法变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile);

class Plugin2 {
  apply(compiler) {
    // 初始化compilation钩子
    compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
      // debugger;
      // console.log(compilation); //json格式的变量信息, 查看不是很方便;
      compilation.hooks.additionalAssets.tapAsync('Plugin2', async (cb) => {
        // debugger;
        // console.log(compilation);

        const content = 'hello plugin2';

        //往要output的资源中,添加一个a.txt
        compilation.assets['a.txt'] = {
          // 文件大小
          size() {
            return content.length;
          },
          //  文件内容
          source() {
            return content;
          },
        };

        const data = await readFile(path.resolve(__dirname, 'b.txt'));

        // compilation.assets['b.txt'] = new RawSource(data);
        compilation.emitAsset('b.txt', new RawSource(data));

        cb();
      });

      // const data = await readFile(path.resolve(__dirname, 'b.txt'));
    });
  }
}

module.exports = Plugin2;
