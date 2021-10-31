(function (window) {
  // 数组去重
  Array.prototype.unique = function () {
    var m = [];
    var n = [];
    for (var i = 0; i < this.length; i++) {
      if (m.indexOf(this[i].id) == -1) {
        m.push(this[i].id);
        n.push(this[i]);
      }
    }
    return n;
  };
  var _u = {};
  _u.origin = "http://api.lictic.com:88/";
  // _u.origin = 'https://www.177pinche.com/';
  // http://api.lictic.com:88/index.php
  // _u.origin = 'http://t.0lz.net/';

  // _u.origin = 'http://177pinche.yznt.com/';

  //  _u.origin = 'http://wancllshop.lugu110.wancll.vip/';
  _u.apiOrigin = _u.origin + "index.php/";
  _u.auth = "Basic_Ivj6eZRxMTx2yiyunZvnG8R67";

  _u.user = $api.getStorage("user");
  _u.token = $api.getStorage("token");
  _u.themeColor = "#358cff";

  //重新修复页面（头部尾部）
  _u.fixPage = function () {
    //状态栏颜色
    api.setStatusBarStyle({
      style: "dark",
    });
    api.parseTapmode();

    $util.header = $api.byId("header");
    $util.header && $api.fixStatusBar($util.header);
    $util.headerH = $util.header ? $api.offset($util.header).h : 0;

    $util.footer = $api.byId("footer");
    $util.footer && $api.fixTabBar($util.footer);
    $util.footerH = $util.footer ? $api.offset($util.footer).h : 0;
  };

  /*队列信息*/
  // _u.queue = [];
  /**
   * ''表示没有
   * 非空的话就表示在进行中，需要阻塞
   */
  /*队列状态*/
  _u.queue_Status = "";
  /**
   * 都压到堆栈里面去，多吃一点内存。
   * @param options
   * @returns {Promise<unknown>}
   */
  _u.ajax = function (options) {
    // _u.queue.push(options);
    return new Promise((resolve, reject) => {
      const a = () => {
        setTimeout(() => {
          if (_u.queue_Status === "") {
            _u.queue_Status = options;
            _u._ajax(options).then((res) => {
              _u.queue_Status = "";
              resolve(res);
            });
          } else {
            a();
          }
        }, 100);
      };
      a();
    });
  };
  // 重新封装 ajax
  _u._ajax = function (options) {
    // 删除上面的内容
    options = {
      url: options.url,
      method: options.method || "POST",
      data: options.data || {},
      headers: options.headers || {},
      callback:
        options.callback ||
        function (ret) {
          _u.toast(ret.msg);
        },
      type: options.type || "body",
      values: options.values || {},
      isLoading: options.isLoading || false,
    };
    options.headers = _u.handleHeaders(options.headers);

    var obj = {
      url: _u.origin + "index.php/" + options.url,
      method: options.method,
      // timeout: 20 * 1000,
      headers: options.headers,
    };
    switch (options.type) {
      case "body":
        obj.data = {
          body: options.data,
        };
        obj.headers["Content-Type"] = "application/json;charset=utf-8";
        break;
      case "files":
        obj.data = {
          files: options.data,
          values: options.values,
        };
        break;
      case "stream":
        obj.data = {
          stream: options.data,
        };
        break;
      default:
        obj.data = {
          body: options.data,
        };
    }
    if (options.isLoading) {
      var UILoading = api.require("UILoading");
      var uiId = "";
      UILoading.flower(
        {
          fixed: true,
        },
        function (ret) {
          uiId = ret.id;
        },
      );
    }
    return new Promise(function (resolve, reject) {
      // console.log(obj);
      // var xhr = new XMLHttpRequest();
      // xhr.open("POST", obj.url, true);
      // // for (const key in obj.headers) {
      // //     if (obj.headers.hasOwnProperty(key)) {
      // //         const element = obj.headers[key];
      // //         xhr.setRequestHeader(key, element)
      // //     }
      // // }
      // xhr.onload = function (e) {
      //     if (xhr.readyState === 4) {
      //         if (xhr.status === 200) {
      //             console.log(xhr.responseText);
      //         } else {
      //             console.error(xhr.statusText);
      //         }
      //     }
      // };
      // xhr.onerror = function (e) {
      //     console.error(xhr.statusText);
      // };
      // xhr.timeout = obj.timeout;
      // xhr.send(JSON.stringify(obj.data.body));

      api.ajax(obj, function (ret, err) {
        if (options.isLoading) {
          UILoading.closeFlower({
            id: uiId,
          });
        }
        api.refreshHeaderLoadDone();
        if (ret) {
          if (ret.code == 0) {
            _u.toast(ret.msg);
            _u.log(ret);
            _u.log(options.url);
            reject(ret);
          } else if (ret.code == 1) {
            console.log(options.url);
            // 针对特定的地址做兼容
            if ("api_drp/commission_applys/lists" === options.url) {
              if (ret.data.applys) {
                let arr = ret.data.applys || [];
                if (arr.length < 10) {
                  window.miniRefresh &&
                    (window.miniRefresh.options.up.isLock = true);
                  window.miniRefresh && window.miniRefresh.endUpLoading(true);
                }
              } else {
                window.miniRefresh &&
                  (window.miniRefresh.options.up.isLock = false);
              }
            } else {
              // commission_applys/lists
              // console.log(`ret.data.length:${ret.data.length}`)
              if (ret.data.length < 10) {
                // 当数据小于10
                window.miniRefresh &&
                  (window.miniRefresh.options.up.isLock = true);
                window.miniRefresh && window.miniRefresh.endUpLoading(true);
              } else {
                window.miniRefresh &&
                  (window.miniRefresh.options.up.isLock = false);
              }
            }
            resolve(ret);
          } else {
            _u.log(options.url);
            _u.log(ret);
            reject(ret);
          }
        } else {
          _u.log(options.url);
          _u.log(err);
          reject(err);
        }
        window.miniRefresh && window.miniRefresh.endDownLoading(true);
        window.miniRefresh && window.miniRefresh.endUpLoading(true);
      });
    });
  };
  // headers 处理
  _u.handleHeaders = function (headers) {
    headers = headers;
    headers["auth"] = _u.auth;
    headers["client-type"] = "app";
    if ($api.getStorage("token")) {
      headers.token = $api.getStorage("token").token;
    }
    return headers;
  };

  //需要登录的窗口集合
  _u.needLoginWinList = [
    "home_win",
    "order_confirm_win",
    "pay_select_win",
    "pay_waiting_win",
    "wallet_win",
    "wallet_detail_win",
    "bill_list_win",
    "balance_win",
    "recharge_win",
    "withdraw_win",
    "cart_list_win",
    "setting_win",
    "bind_third_setting_win",
    "address_list_win",
    "address_edit_win",
    "orders_win",
    "order_detail_win",
    "order_refund_win",
    "logistics_win",
    "collection_list_win",
    "comment_list_win",
    "comment_add_win",
    "idcard_auth_win",
    "idcard_info_win",
    "bankcard_list_win",
    "bankcard_edit_win",
    "my_qrcode_win",
    "coupon_list_win",
    "help_and_option_win",
  ];
  //三个主页，不需要动画
  _u.indexWinList = [
    "index_win",
    "goods_list_new_win",
    "cart_list_win",
    "home_win",
  ];
  //打开新窗口
  _u.openWindow = function (winName, params) {
    $util.user = $api.getStorage("user");
    if ($util.needLoginWinList.indexOf(winName) != -1 && !$util.user) {
      winName = "login_win";
    }
    // 打开window参数
    var pageConfig = {
      name: winName,
      url: "./" + winName + ".html",
      pageParam: params,
      slidBackEnabled: false, //滑动返回
      overScrollMode: "always",
      vScrollBarEnabled: false,
      hScrollBarEnabled: false,
      allowEdit: true,
    };
    if ($util.indexWinList.indexOf(winName) != "-1") {
      pageConfig.animation = {
        type: "none",
      };
    }
    api.openWin(pageConfig);
  };
  // 打开新frame
  _u.openFrame = function (frmName, params, rect, bgColor) {
    var frameH = api.winHeight - $util.footerH - $util.headerH;
    // 打开Frame参数
    var pageConfig = {
      name: frmName,
      url: "./" + frmName + ".html",
      rect: {
        x: 0,
        y: $util.headerH,
        w: "auto",
        h: frameH,
      },
      bounces: true,
      bgColor: "rgba(0,0,0,0)",
      vScrollBarEnabled: false,
      hScrollBarEnabled: false,
      allowEdit: true,
    };
    if (rect) {
      pageConfig.rect = rect;
    }
    if (params) {
      pageConfig.pageParam = params;
    }
    if (bgColor) {
      pageConfig.bgColor = bgColor;
    }
    api.openFrame(pageConfig);
  };
  //吐丝弹窗
  _u.toast = function (msg) {
    alert(msg);
    // api.toast({
    //     msg: msg,
    //     duration: 2000,
    //     location: 'middle'
    // });
  };

  //校验手机号码
  _u.variMobile = function (mobile) {
    return /^1\d{10}$/.test(mobile);
  };
  //校验密码
  _u.variPassword = function (pwd) {
    return /^[A-Za-z0-9]{6,20}$/.test(pwd);
  };
  // 打印日志
  _u.log = function (data) {
    console.log(JSON.stringify(data));
  };
  // 判断是否为空对象
  _u.isEmptyObject = function (obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  };

  window.$util = _u;
})(window);
