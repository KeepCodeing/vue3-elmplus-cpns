import { nextTick } from "vue";

// https://github.com/element-plus/element-plus/blob/dev/packages/components/infinite-scroll/src/index.ts

// 口述思路：
// 无限滚动主要问题就是如何判断触底。针对父容器而言，scrollTop表示滑动出去部分的元素高度
// clientHeight表示可见区域高度，scrollHeight表示可见区域+滑动出去部分元素的高度，那么
// 可知scrollTop + clientHeight >= scrollHeight就说明滚动到底部了
// 在父容器上监听滚动事件，滚动时判断是否触底，触底执行加载数据的回调，一般来说是会增加
// 若干个列表项，这时scrollHeight变高，继续滑动触底重复这过程就完成了无限滚动。
// 数据第一次加载可分为两种情况，能够产生溢出和不能产生溢出，能够产生溢出时我们无需额外操作
// 不能产生溢出时需要通过多次调用回调直到产生溢出为止。
// 如何判断是否产生溢出：使用MutationObverser当DOM变化时执行回调，如果溢出了就停止调用
// 回调
// 用户可以通过设置数据是否加载完毕来停止滑动监听和触底加载。

// 流程总结：
// 1. 首先判断什么是触底条件
// 2. 接下来考虑指令各个声明周期大体任务
// 2.1 mounted：绑定事件，初始化
// 2.2 updated：元素更新判断是否停止加载
// 2.3 unmounted：解除事件绑定
// 3. 通过绑定事件判断是否触底，可加上节流防抖优化
// 4. 如果触底调用回调
// 5. 如果第一次加载数据无法填充整个容器，多次调用回调直到填满

// 为什么自己写的这么粪：
// 核心原因是没有用MutationObserver。丢掉DOM响应式在数据初始无法填满时
// 尤其麻烦，迫真教程用的定时器，本five跟着用就导致各种DOM/数据不同步
// 问题...另外还有个bug，也就是节流导致触底事件无法100%触发，element-plus
// 中主要有个50ms的Obverser监听DOM改变，还有个200ms的滑动节流监听是否触底..

export default {
  install(app) {
    const isArrivedBottom = (el) => {
      // 这种情况说明没有产生溢出，也就是没有占满
      // if (el.clientHeight === el.scrollHeight) return false;
      // console.log(el.scrollTop, el.clientHeight, el.scrollHeight);
      return el.scrollTop + el.clientHeight >= el.scrollHeight;
    };

    // 看了眼element-plus中无限滚动的参数，例如节流延时
    // 是采用html属性传入的（或者说动态绑定）...
    const throttle = (cb, limit = 50) => {
      let lastTime = 0;

      return (...arg) => {
        const now = new Date().getTime();

        if (now - lastTime < limit) return;

        lastTime = now;

        cb.apply(this, arg);
      };
    };

    const walk = (el, cb) => {
      // 问题：节流导致滑动到底部的数据不一定是最新的，这样就导致了
      // 可能已经滑动到底部但是数据还是200ms之前的

      // element-plus中的解决方法是使用MutationObserver监听DOM变化，
      // 再单独设置个50ms的回调，也就是它用了两个回调，一个200ms的和
      // 一个50ms的。而DOM监听回调（checkfull）会额外判断是否需要终止
      // 加载，200ms的回调（handleScroll）只是对其滑动是否触发加载
      // 的简单判断

      // 实际测试发现50ms也可能导致没法加载，所以最好还是设置个阈值？

      if (isArrivedBottom(el)) {
        // 触底再次执行回调
        cb();
      } else {
      }
    };

    // 判断一开始是否占满应该单独独立出来...
    // 之前写在触底里了，但实际并不能复用..
    // 思路就是滑动高度 <= 元素高度，注意clientHeight是固定的
    // 所以反过来永远都是满足的...
    const isFull = (el) => el.scrollHeight > el.clientHeight;

    app.directive("inf-scroll", {
      mounted(el, binding) {
        if (typeof binding.value !== "function")
          throw new Error("deactive needs a function callback");
        // const cb = throttle(() => walk(el, binding.value));
        const cb = throttle(walk.bind(this, el, binding.value));

        // 看的教程里用的修饰符，然而修饰符应该不能直接绑变量，官方也没写修饰符
        // 当变量的写法
        // 当然推荐还是data-set写法，这样可以传入更多参数，只不过这里偷懒不写...
        // 然后发现坠毁w，因为只能传一个参数所以没法保证loading时触底不加载...
        const { arg, modifiers } = binding;

        // 除了 el 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，
        // 推荐通过元素的 dataset attribute 实现。

        // 官网推荐只更改el，那么就把监听函数绑到el上...

        el.cb = cb;

        el.addEventListener("scroll", el.cb);

        // console.log(isArrivedBottom(el));

        // 如何立即加载呢？实际上这块和触底是有区别的，触底在一开始就是
        // 不满足的情况
        // 元素没法占满父元素同样也是无法触底的情况，但前者应该等待用户操作
        // 后者应该是程序加载

        if (!isFull(el)) {
          const timer = setInterval(async () => {
            binding.value();
            // 同样有因为延时导致的el属性不是最新...
            // 如果太短会导致nextTick优化，页面还是没法更新...
            console.log(el.clientHeight, el.scrollHeight);
            if (isFull(el)) clearInterval(timer);
          }, 200);
        }

        // 感觉修饰符写法只能说锦上添花，最好还是直接判断初始数据是否触底...
        if (modifiers.imitate) {
        }
      },

      // 父子元素全都更新完成后调用，所以这里可以用来判断下加载是否完成
      updated(el, binding) {
        const stop = binding.arg;
        const loading = el.getAttribute("loading");
        if (stop) {
          el.removeEventListener("scroll", el.cb);
          console.log("done");
          return;
        }
        if (!stop && loading) return;
      },

      unmounted(el, binding) {
        el.removeEventListener("scroll", el.cb);
      },
    });
  },
};
