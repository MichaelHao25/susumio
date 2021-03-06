/*!
 * minirefresh v2.0.2
 * (c) 2017-2018 dailc
 * Released under the MIT License.
 * https://github.com/minirefresh/minirefresh
 */

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.MiniRefresh = factory());
})(this, function () {
  "use strict";

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    }
    return call && (typeof call === "object" || typeof call === "function")
      ? call
      : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError(
        "Super expression must either be null or a function, not " +
          typeof superClass,
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  }

  var Core = MiniRefreshTools.Core;
  var version = MiniRefreshTools.version;
  var extend = MiniRefreshTools.extend;
  var namespace = MiniRefreshTools.namespace;

  /**
   * ?????????????????????CSS??????????????????????????????????????????????????????
   * THEME ??????????????????????????????????????????
   * ?????????body???scroll???????????????????????? CLASS_BODY_SCROLL_WRAP
   */
  var CLASS_THEME = "minirefresh-theme-default";
  var CLASS_DOWN_WRAP = "minirefresh-downwrap";
  var CLASS_UP_WRAP = "minirefresh-upwrap";
  var CLASS_FADE_IN = "minirefresh-fade-in";
  var CLASS_FADE_OUT = "minirefresh-fade-out";
  var CLASS_TO_TOP = "minirefresh-totop";
  var CLASS_ROTATE = "minirefresh-rotate";
  var CLASS_HARDWARE_SPEEDUP = "minirefresh-hardware-speedup";
  var CLASS_HIDDEN = "minirefresh-hidden";
  var CLASS_BODY_SCROLL_WRAP = "body-scroll-wrap";

  /**
   * ????????????????????????
   */
  var CLASS_DOWN_SUCCESS = "downwrap-success";
  var CLASS_DOWN_ERROR = "downwrap-error";
  var CLASS_STATUS_DEFAULT = "status-default";
  var CLASS_STATUS_PULL = "status-pull";
  var CLASS_STATUS_LOADING = "status-loading";
  var CLASS_STATUS_SUCCESS = "status-success";
  var CLASS_STATUS_ERROR = "status-error";
  var CLASS_STATUS_NOMORE = "status-nomore";

  /**
   * ????????????
   */
  var DEFAULT_DOWN_HEIGHT = 75;

  var defaultSetting = {
    down: {
      successAnim: {
        // ??????????????????????????????????????????????????????false??????????????????????????????xxx?????????????????????????????????true??????????????????hook??????
        isEnable: false,
        duration: 300,
      },
      // ?????????????????????????????????????????????????????????????????????????????????
      contentdown: "????????????",
      // ?????????????????????????????????????????????????????????????????????????????????
      contentover: "????????????",
      // ???????????????????????????????????????????????????????????????????????????
      contentrefresh: "?????????...",
      // ??????????????????????????????????????????successAnim????????????
      contentsuccess: "????????????",
      // ???????????????????????????????????????????????????????????????successAnim????????????
      contenterror: "????????????",
      // ????????????????????????css??????
      isWrapCssTranslate: false,
    },
    up: {
      toTop: {
        // ??????????????????????????????
        isEnable: true,
        duration: 300,
        // ???????????????????????????toTop
        offset: 800,
      },
      // ????????????????????????????????? ?????????????????? ???
      contentdown: "",
      contentrefresh: "?????????...",
      contentnomore: "?????????????????????",
    },
  };

  var MiniRefreshTheme = (function (_Core) {
    _inherits(MiniRefreshTheme, _Core);

    /**
     * ?????????????????????????????????
     * @param {Object} options ????????????
     * @constructor
     */
    function MiniRefreshTheme(options) {
      _classCallCheck(this, MiniRefreshTheme);

      var newOptions = extend(true, {}, defaultSetting, options);

      return _possibleConstructorReturn(
        this,
        (
          MiniRefreshTheme.__proto__ || Object.getPrototypeOf(MiniRefreshTheme)
        ).call(this, newOptions),
      );
    }

    _createClass(
      MiniRefreshTheme,
      [
        {
          key: "_initHook",
          value: function _initHook() {
            var container = this.container;
            var contentWrap = this.contentWrap;

            container.classList.add(CLASS_THEME);
            // ????????????????????????????????????
            contentWrap.classList.add(CLASS_HARDWARE_SPEEDUP);

            if (this.options.isUseBodyScroll) {
              // ???????????????body???scroll????????????????????????????????????????????????absolute??????????????????
              container.classList.add(CLASS_BODY_SCROLL_WRAP);
              contentWrap.classList.add(CLASS_BODY_SCROLL_WRAP);
            }

            this._initDownWrap();
            this._initUpWrap();
            this._initToTop();
          },

          /**
           * ?????????????????????????????????????????????????????????
           */
        },
        {
          key: "_refreshHook",
          value: function _refreshHook() {
            // ????????????csstranslate???????????????
            if (this.options.down.isWrapCssTranslate) {
              this._transformDownWrap(-this.downWrapHeight);
            } else {
              this._transformDownWrap(0, 0, true);
            }

            // toTop?????????????????????????????????????????????????????????????????????????????????
            if (!this.options.up.toTop.isEnable) {
              this.toTopBtn && this.toTopBtn.classList.add(CLASS_HIDDEN);
              this.isShowToTopBtn = false;
            }
          },
        },
        {
          key: "_initDownWrap",
          value: function _initDownWrap() {
            var container = this.container;
            var contentWrap = this.contentWrap;
            var options = this.options;

            // ???????????????
            var downWrap = document.createElement("div");

            downWrap.className = CLASS_DOWN_WRAP + " " + CLASS_HARDWARE_SPEEDUP;
            downWrap.innerHTML =
              ' \n            <div class="downwrap-content">\n                <p class="downwrap-progress"></p>\n                <p class="downwrap-tips">' +
              options.down.contentdown +
              "</p>\n            </div>\n        ";
            container.insertBefore(downWrap, contentWrap);

            this.downWrap = downWrap;
            this.downWrapProgress =
              this.downWrap.querySelector(".downwrap-progress");
            this.downWrapTips = this.downWrap.querySelector(".downwrap-tips");
            // ?????????????????????????????????pull??????????????????
            this.isCanPullDown = false;
            this.downWrapHeight = downWrap.offsetHeight || DEFAULT_DOWN_HEIGHT;
            this._transformDownWrap(-this.downWrapHeight);
            MiniRefreshTheme._changeWrapStatusClass(
              this.downWrap,
              CLASS_STATUS_DEFAULT,
            );
          },
        },
        {
          key: "_transformDownWrap",
          value: function _transformDownWrap() {
            var offset =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : 0;
            var duration =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : 0;
            var isForce = arguments[2];

            if (!isForce && !this.options.down.isWrapCssTranslate) {
              // ???????????????isWrapCssTranslate??????????????????isForce??????????????????
              return;
            }

            var duratuinStr = duration + "ms";
            var transformStr = "translateY(" + offset + "px)  translateZ(0px)";

            // ??????????????? translateZ ??????????????????????????????
            this.downWrap.style.webkitTransitionDuration = duratuinStr;
            this.downWrap.style.transitionDuration = duratuinStr;
            this.downWrap.style.webkitTransform = transformStr;
            this.downWrap.style.transform = transformStr;
          },
        },
        {
          key: "_initUpWrap",
          value: function _initUpWrap() {
            var contentWrap = this.contentWrap;
            var options = this.options;

            // ????????????
            var upWrap = document.createElement("div");

            upWrap.className = CLASS_UP_WRAP + " " + CLASS_HARDWARE_SPEEDUP;
            upWrap.innerHTML =
              ' \n            <p class="upwrap-progress"></p>\n            <p class="upwrap-tips">' +
              options.up.contentdown +
              "</p>\n        ";

            upWrap.style.visibility = "hidden";
            // ??????container???
            contentWrap.appendChild(upWrap);

            this.upWrap = upWrap;
            this.upWrapProgress = this.upWrap.querySelector(".upwrap-progress");
            this.upWrapTips = this.upWrap.querySelector(".upwrap-tips");
            MiniRefreshTheme._changeWrapStatusClass(
              this.upWrap,
              CLASS_STATUS_DEFAULT,
            );
          },

          /**
           * ?????????????????????toTop?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
           * ?????????????????????????????????????????????minirefresh-totop???????????????????????????
           */
        },
        {
          key: "_initToTop",
          value: function _initToTop() {
            var _this2 = this;

            var options = this.options;
            var toTop = options.up.toTop.isEnable;
            var duration = options.up.toTop.duration;

            if (toTop) {
              var toTopBtn = document.createElement("div");

              toTopBtn.className = CLASS_TO_TOP + " " + CLASS_THEME;

              toTopBtn.onclick = function () {
                _this2.scroller.scrollTo(0, duration);
              };
              toTopBtn.classList.add(CLASS_HIDDEN);
              this.toTopBtn = toTopBtn;
              this.isShowToTopBtn = false;
              // ???????????????body???????????????
              // ???????????????container???????????????totop????????????
              this.container.appendChild(toTopBtn);
            }
          },
        },
        {
          key: "_pullHook",
          value: function _pullHook(downHight, downOffset) {
            var options = this.options;
            var FULL_DEGREE = 360;

            if (downHight < downOffset) {
              if (this.isCanPullDown) {
                this.isCanPullDown = false;
                MiniRefreshTheme._changeWrapStatusClass(
                  this.downWrap,
                  CLASS_STATUS_DEFAULT,
                );
                this.downWrapTips.innerText = options.down.contentdown;
              }
            } else if (!this.isCanPullDown) {
              this.downWrapTips.innerText = options.down.contentover;
              this.isCanPullDown = true;
              MiniRefreshTheme._changeWrapStatusClass(
                this.downWrap,
                CLASS_STATUS_PULL,
              );
            }

            if (this.downWrapProgress) {
              var rate = downHight / downOffset;
              var progress = FULL_DEGREE * rate;
              var rotateStr = "rotate(" + progress + "deg)";

              this.downWrapProgress.style.webkitTransform = rotateStr;
              this.downWrapProgress.style.transform = rotateStr;
            }

            this._transformDownWrap(-this.downWrapHeight + downHight);
          },
        },
        {
          key: "_scrollHook",
          value: function _scrollHook(scrollTop) {
            // ????????????toTop
            var options = this.options;
            var toTop = options.up.toTop.isEnable;
            var toTopBtn = this.toTopBtn;

            if (toTop && toTopBtn) {
              if (scrollTop >= options.up.toTop.offset) {
                if (!this.isShowToTopBtn) {
                  toTopBtn.classList.remove(CLASS_FADE_OUT);
                  toTopBtn.classList.remove(CLASS_HIDDEN);
                  toTopBtn.classList.add(CLASS_FADE_IN);
                  this.isShowToTopBtn = true;
                }
              } else if (this.isShowToTopBtn) {
                toTopBtn.classList.add(CLASS_FADE_OUT);
                toTopBtn.classList.remove(CLASS_FADE_IN);
                this.isShowToTopBtn = false;
              }
            }
          },
        },
        {
          key: "_downLoaingHook",
          value: function _downLoaingHook() {
            // ?????????contentWrap?????????
            this._transformDownWrap(
              -this.downWrapHeight + this.options.down.offset,
              this.options.down.bounceTime,
            );
            this.downWrapTips.innerText = this.options.down.contentrefresh;
            this.downWrapProgress.classList.add(CLASS_ROTATE);
            MiniRefreshTheme._changeWrapStatusClass(
              this.downWrap,
              CLASS_STATUS_LOADING,
            );
          },
        },
        {
          key: "_downLoaingSuccessHook",
          value: function _downLoaingSuccessHook(isSuccess, successTips) {
            this.options.down.contentsuccess =
              successTips || this.options.down.contentsuccess;
            this.downWrapTips.innerText = isSuccess
              ? this.options.down.contentsuccess
              : this.options.down.contenterror;
            this.downWrapProgress.classList.remove(CLASS_ROTATE);
            this.downWrapProgress.classList.add(CLASS_FADE_OUT);
            this.downWrapProgress.classList.add(
              isSuccess ? CLASS_DOWN_SUCCESS : CLASS_DOWN_ERROR,
            );

            MiniRefreshTheme._changeWrapStatusClass(
              this.downWrap,
              isSuccess ? CLASS_STATUS_SUCCESS : CLASS_STATUS_ERROR,
            );
          },
        },
        {
          key: "_downLoaingEndHook",
          value: function _downLoaingEndHook(isSuccess) {
            this.downWrapTips.innerText = this.options.down.contentdown;
            this.downWrapProgress.classList.remove(CLASS_ROTATE);
            this.downWrapProgress.classList.remove(CLASS_FADE_OUT);
            this.downWrapProgress.classList.remove(
              isSuccess ? CLASS_DOWN_SUCCESS : CLASS_DOWN_ERROR,
            );
            // ??????????????????
            // ??????????????????
            this.isCanPullDown = false;
            this._transformDownWrap(
              -this.downWrapHeight,
              this.options.down.bounceTime,
            );
            MiniRefreshTheme._changeWrapStatusClass(
              this.downWrap,
              CLASS_STATUS_DEFAULT,
            );
          },
        },
        {
          key: "_cancelLoaingHook",
          value: function _cancelLoaingHook() {
            this._transformDownWrap(
              -this.downWrapHeight,
              this.options.down.bounceTime,
            );
            MiniRefreshTheme._changeWrapStatusClass(
              this.downWrap,
              CLASS_STATUS_DEFAULT,
            );
          },
        },
        {
          key: "_upLoaingHook",
          value: function _upLoaingHook(isShowUpLoading) {
            if (isShowUpLoading) {
              this.upWrapTips.innerText = this.options.up.contentrefresh;
              this.upWrapProgress.classList.add(CLASS_ROTATE);
              this.upWrapProgress.classList.remove(CLASS_HIDDEN);
              this.upWrap.style.visibility = "visible";
            } else {
              this.upWrap.style.visibility = "hidden";
            }
            MiniRefreshTheme._changeWrapStatusClass(
              this.upWrap,
              CLASS_STATUS_LOADING,
            );
          },
        },
        {
          key: "_upLoaingEndHook",
          value: function _upLoaingEndHook(isFinishUp) {
            if (!isFinishUp) {
              // ??????????????????????????????
              // this.upWrap.style.visibility = 'hidden';
              this.upWrapTips.innerText = this.options.up.contentdown;
              MiniRefreshTheme._changeWrapStatusClass(
                this.upWrap,
                CLASS_STATUS_DEFAULT,
              );
            } else {
              // ???????????????????????????
              // this.upWrap.style.visibility = 'visible';
              this.upWrapTips.innerText = this.options.up.contentnomore;
              MiniRefreshTheme._changeWrapStatusClass(
                this.upWrap,
                CLASS_STATUS_NOMORE,
              );
            }
            this.upWrapProgress.classList.remove(CLASS_ROTATE);
            this.upWrapProgress.classList.add(CLASS_HIDDEN);
          },
        },
        {
          key: "_resetUpLoadingHook",
          value: function _resetUpLoadingHook() {
            // this.upWrap.style.visibility = 'hidden';
            this.upWrapTips.innerText = this.options.up.contentdown;
            this.upWrapProgress.classList.remove(CLASS_ROTATE);
            this.upWrapProgress.classList.add(CLASS_HIDDEN);
            MiniRefreshTheme._changeWrapStatusClass(
              this.upWrap,
              CLASS_STATUS_DEFAULT,
            );
          },
        },
        {
          key: "_lockUpLoadingHook",
          value: function _lockUpLoadingHook(isLock) {
            this.upWrap.style.visibility = isLock ? "hidden" : "visible";
          },
        },
        {
          key: "_lockDownLoadingHook",
          value: function _lockDownLoadingHook(isLock) {
            this.downWrap.style.visibility = isLock ? "hidden" : "visible";
          },
        },
      ],
      [
        {
          key: "_changeWrapStatusClass",
          value: function _changeWrapStatusClass(wrap, statusClass) {
            wrap.classList.remove(CLASS_STATUS_NOMORE);
            wrap.classList.remove(CLASS_STATUS_DEFAULT);
            wrap.classList.remove(CLASS_STATUS_PULL);
            wrap.classList.remove(CLASS_STATUS_LOADING);
            wrap.classList.remove(CLASS_STATUS_SUCCESS);
            wrap.classList.remove(CLASS_STATUS_ERROR);
            wrap.classList.add(statusClass);
          },
        },
      ],
    );

    return MiniRefreshTheme;
  })(Core);

  MiniRefreshTheme.sign = "default";
  MiniRefreshTheme.version = version;
  namespace("theme.defaults", MiniRefreshTheme);

  // ??????????????????
  window.MiniRefresh = MiniRefreshTheme;

  return MiniRefreshTheme;
});
