(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.singleSpaVue = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = singleSpaVue;

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var defaultOpts = {
    // required opts
    Vue: null,
    appOptions: null,
    template: null
  };

  function singleSpaVue(userOpts) {
    if ((typeof userOpts === 'undefined' ? 'undefined' : _typeof(userOpts)) !== 'object') {
      throw new Error('single-spa-vue requires a configuration object');
    }

    var opts = _extends({}, defaultOpts, userOpts);

    if (!opts.Vue) {
      throw new Error('single-spa-vuejs must be passed opts.Vue');
    }

    if (!opts.appOptions) {
      throw new Error('single-spa-vuejs must be passed opts.appOptions');
    }

    // Just a shared object to store the mounted object state
    var mountedInstances = {};

    return {
      bootstrap: bootstrap.bind(null, opts, mountedInstances),
      mount: mount.bind(null, opts, mountedInstances),
      unmount: unmount.bind(null, opts, mountedInstances),
      update: update.bind(null, opts, mountedInstances)
    };
  }

  function bootstrap(opts) {
    return Promise.resolve();
  }

  function mount(opts, mountedInstances, props) {
    return Promise.resolve().then(function () {
      var otherOptions = {};
      if (props.domElement && !opts.appOptions.el) {
        otherOptions.el = props.domElement;
      }

      var options = _extends({}, opts.appOptions, otherOptions, {
        data: _extends({}, opts.appOptions.data || {}, props)
      });

      mountedInstances.instance = new opts.Vue(options);
      if (mountedInstances.instance.bind) {
        mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance);
      }
      return mountedInstances.instance
    });
  }

  function update(opts, mountedInstances, props) {
    return new Promise(function (resolve) {
      var data = _extends({}, opts.appOptions.data || {}, props);
      for (var prop in data) {
        mountedInstances.instance[prop] = data[prop];
      }
      resolve();
    });
  }

  function unmount(opts, mountedInstances) {
    return Promise.resolve().then(function () {
      mountedInstances.instance.$destroy();
      mountedInstances.instance.$el.innerHTML = '';
      delete mountedInstances.instance;
    });
  }
});
//# sourceMappingURL=single-spa-vue.js.map
