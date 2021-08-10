// hooks : 生命周期函数，一定会保证前面的执行完再执行后面,尊重生命的顺序?

class Plugin1 {
  apply(compiler) {
    compiler.hooks.emit.tap('Plugin', (compilation) => {
      console.log('emit.tap 111');
    });

    compiler.hooks.afterEmit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit.tapAsync 111');
        cb();
      }, 2000);
    });

    compiler.hooks.afterEmit.tapPromise('Plugin1', (compilation) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('emit.tapPromise 111');
          resolve();
        }, 1000);
      });
    });

    compiler.hooks.afterEmit.tap('Plugin1', (compilation) => {
      console.log('afterEmit.tap 111');
    });

    compiler.hooks.done.tap('Plugin1', (stats) => {
      console.log('done.tap 111');
    });
  }
}

module.exports = Plugin1;

// npx webpack
// output:
// emit.tap 111
// emit.tapAsync 111
// emit.tapPromise 111
// afterEmit.tap 111
// done.tap 111
