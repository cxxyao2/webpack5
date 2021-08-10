// SyncBailHook 跟 SyncHook不一样
// SyncBailHook碰到返回值，后面的代码就不执行了
// 同步hook, 任务依次执行

const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require('tapable');

class Lesson {
  constructor() {
    // 初始化容器,
    // address是个参数
    this.hooks = {
      go: new SyncBailHook(['address']),
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
  }

  start() {
    // 触发hooks
    this.hooks.go.call('c318');
  }
}

const l = new Lesson();
l.tap();
l.start();
