// 异步hooks
// AsyncParallelHook: 异步并行

const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require('tapable');

class Lesson {
  constructor() {
    // 初始化容器,

    this.hooks = {
      go: new SyncBailHook(['address']),
      leave: new AsyncParallelHook(['name', 'age']),
    };
  }

  tap() {
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('class0318', (address) => {
      console.log('class0318', address);
      return 111;
    });

    this.hooks.go.tap('class0319', (address) => {
      console.log('class0319', address);
    });

    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0510', name, ' age is', age);
        cb();
      }, 2000);
    });

    // tapPromise 跟tapAsync不一样,需要返回一个promise
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('class0610', name, age);
          resolve();
        }, 1000);
      });
    });
  }

  start() {
    // 触发hooks
    this.hooks.go.call('c318');
    this.hooks.leave.callAsync('jack', 18, function () {
      // 回调函数执行时,代表leave容器中的函数触发完了, 才触发
      console.log('end...');
    });
  }
}

const l = new Lesson();
l.tap();
l.start();

// output
// class0318 c318
// class0610 jack 18
// class0510 jack  age is 18
// end...
