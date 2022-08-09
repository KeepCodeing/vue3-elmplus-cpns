export default {
  install(app) {
    const isArrivedBottom = (el) => {
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

    app.directive("inf-scroll", {
      mounted(el, binding) {
        if (typeof binding.value !== "function")
          throw new Error("deactive needs a function callback");
        // const cb = throttle(() => walk(el, binding.value));
        const cb = throttle(walk.bind(this, el, binding.value));

        const { instance, modifiers } = binding;

        instance.cb = cb;

        el.addEventListener("scroll", instance.cb);

        if (modifiers.imitate) {
        }
      },

      updated(el, binding) {
        console.log("bbb");
      },

      unmounted(el, binding) {
        el.removeEventListener("scroll", instance.cb);
      },
    });
  },
};
