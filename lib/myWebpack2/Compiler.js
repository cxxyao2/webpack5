const { getAst, getDeps, getCode } = require('./parser');

class Compiler {
  constructor(options = {}) {
    this.options = options;
    // 所有依赖的容器
    this.modules = [];
  }

  //启动webpack打包
  run() {
    // 入口文件路径
    const filePath = this.options.entry;

    // 第一次构建,得到入口文件的信息
    const fileInfo = this.build(filePath);

    this.modules.push(fileInfo);

    // 遍历所有的依赖
    this.modules.forEach((fileInfo) => {
      // 取出当前文件的所有依赖
      const deps = fileInfo.deps;
      // 遍历
      for (const relativePath in deps) {
        // 依赖文件的绝对路径
        const absolutePath = deps[relativePath];
        // 将处理后的结果添加到modules中, 后面遍历就会遍历它了..
        this.modules.push(fileInfo);
      }
    });

    // 希望得到如下的结果
    /**
     {
       'index.js':{
         code:'xxx',
         deps:{'add.js':'xxx'}
       },
       'add.js':{
         code:'xxx',
         deps:{}
       }
     }
     */
    const depsGraph = this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filePath]: {
          code: module.code,
          deps: module.deps,
        },
      };
    }, {});
  }

  // 开始构建
  build(filePath) {
    const ast = getAst(filePath);
    const deps = getDeps(ast, filePath);
    const code = getCode(ast);

    console.log(ast);
    console.log(deps);
    console.log(code);
    return {
      ast,
      deps,
      code,
    };
  }
}

module.exports = Compiler;
