!function () {
  function e(e) {
    e = e.replace("widget://", B);
    var n = document.createElement("a");
    return n.href = e,
      n.href
  }
  function n(e) {
    var n = e.url
      , t = e.pageParam
      , o = "";
    if (t) {
      o = "?";
      var r = !0;
      for (var i in t) {
        var a = "&";
        r && (a = "",
          r = !1),
          t.hasOwnProperty(i) && (o += a + i + "=" + encodeURIComponent(t[i]))
      }
    }
    "?" === o && (o = "");
    return n + o
  }
  function t(e) {
    var n = {};
    return e.substr(1).split("&").forEach(function (e) {
      if (e) {
        var t = (e = e.split("+").join(" ")).indexOf("=")
          , o = t > -1 ? e.substr(0, t) : e
          , r = t > -1 ? decodeURIComponent(e.substr(t + 1)) : ""
          , i = o.indexOf("[");
        if (-1 === i)
          n[decodeURIComponent(o)] = r;
        else {
          var a = o.indexOf("]", i)
            , d = decodeURIComponent(o.substring(i + 1, a));
          o = decodeURIComponent(o.substring(0, i)),
            n[o] || (n[o] = []),
            d ? n[o][d] = r : n[o].push(r)
        }
      }
    }),
      n
  }
  function o(e) {
    var n = document.createElement("a");
    n.href = e;
    var o = t(n.search)
      , r = "?";
    for (var i in o)
      if (o.hasOwnProperty(i)) {
        var a = "&";
        "?" === r && (a = ""),
          r += a + i + "=" + encodeURIComponent(o[i])
      }
    "?" === r && (r = "");
    return n.protocol + "//" + n.hostname + (n.port ? ":" + n.port : "") + n.pathname + r
  }
  function r(e, n, t, o) {
    return function () {
      R.on(e, n, t, o)
    }
  }
  function i(e, n, t, o) {
    setTimeout(r(e, n, t, o), 0)
  }
  function a(e, n, t, o, r, i) {
    var a = {};
    if (a.className = e,
      a.moduleName = r,
      a.moduleMethodName = n,
      a.sync = o,
      a.newMode = i,
      1 === t.length) {
      l = t[0];
      a.param = l,
        "function" == typeof l && (a.cbId = R.id++,
          R.fn[a.cbId] = l)
    } else if (2 === t.length) {
      var l = t[0]
        , s = t[1];
      "[object Object]" === Object.prototype.toString.call(l) && (a.param = l),
        "function" == typeof s && (a.cbId = R.id++,
          R.fn[a.cbId] = s)
    }
    return d(a)
  }
  function d(e) {
    var n = window
      , t = window
      , o = window.top;
    t === o && (t = null,
      n = null),
      t !== o && n === t && (n = null);
    var r = {
      moduleName: e.moduleName,
      method: e.moduleMethodName,
      isSync: e.isSync,
      params: e.param,
      cbId: e.cbId,
      callback: i,
      frameDom: n,
      winDom: t,
      apiDom: o
    }
      , a = [];
    n && n.apiadapter && a.push(n.apiadapter),
      t && t.apiadapter && a.push(t.apiadapter),
      o && o.apiadapter && a.push(o.apiadapter),
      a.push(T);
    for (var d = 0; d < a.length; d++) {
      var l = (0,
        a[d])(r);
      if (d === a.length - 1)
        return l;
      if ("TO_NEXT_API_ADAPTER" !== l)
        return l
    }
  }
  function l() {
    if (j < 50) {
      var e = window.apiready;
      "function" == typeof e ? (e(),
        U.sendEvent({
          name: "appintent",
          extra: {
            iosUrl: "",
            sourceAppId: "",
            appParam: U.appParam
          }
        }),
        window.parent === window.top && window.parent !== window && U.sendEvent({
          name: "viewappear"
        })) : (j++,
          setTimeout(l, 100))
    }
  }
  function s(e) {
    return e.currentTarget.disabled
  }
  function c(e) {
    return "string" == typeof e
  }
  function u(e) {
    if (!U.isScrolling && !s(e)) {
      var n = e.currentTarget
        , t = new G;
      t.X = e.touches[0].clientX,
        t.Y = e.touches[0].clientY,
        t.downTime = e.timeStamp;
      var o = n.getAttribute(z);
      c(o) || (o = ""),
        o = o.trim(),
        t.clas = o,
        n.clicker = t,
        function (e, n) {
          if (e && n)
            for (var t = n.split(" "), o = 0; o < t.length; o++) {
              var r = t[o];
              c(r) && r.length > 0 && e.classList.add(r.trim())
            }
        }(n, o)
    }
  }
  function p(e) {
    if (!s(e)) {
      var n = e.currentTarget
        , t = n.clicker;
      if (t) {
        var o = e.touches[0].clientX
          , r = e.touches[0].clientY;
        (Math.abs(o - t.X) > V || Math.abs(r - t.Y) > V) && f(n, !0)
      }
    }
  }
  function w(e) {
    if (!s(e)) {
      var n = e.currentTarget;
      f(n),
        U.didShowExitAction || function (e, n) {
          if (n.uzonclick) {
            n.clicker && (e.preventDefault(),
              n.uzonclick(n, e),
              n.clicker = null)
          }
        }(e, n)
    }
  }
  function m(e) {
    f(e.currentTarget, !0)
  }
  function f(e, n) {
    !function (e) {
      if (e && e.clicker) {
        var n = e.clicker.clas;
        if (n)
          for (var t = n.split(" "), o = 0; o < t.length; o++) {
            var r = t[o];
            c(r) && r.length > 0 && e.classList.remove(r.trim())
          }
      }
    }(e),
      n && (e.clicker = null)
  }
  function v(e) {
    var n = e.winName
      , t = e.frameName;
    void 0 === n && (n = U.winName);
    return function (e, n) {
      if (void 0 === n)
        return e;
      for (var t = e.contentWindow.document.getElementsByTagName("iframe"), o = e, r = 0; r < t.length; r++) {
        var i = t[r];
        if (i.name === n) {
          o = i;
          break
        }
      }
      return o
    }(h(n), t)
  }
  function h(e) {
    for (var n = window.top.document.getElementsByTagName("iframe"), t = null, o = 0; o < n.length; o++) {
      var r = n[o];
      if (r.name === e) {
        t = r;
        break
      }
    }
    return t
  }
  function g(e, n) {
    if (void 0 === n)
      return null;
    for (var t = e.contentWindow.document.getElementsByTagName("iframe"), o = null, r = e.contentWindow.document.getElementsByTagName("body")[0], i = 0; i < t.length; i++) {
      var a = t[i];
      if (a.name === n && a.parentNode.parentNode === r) {
        o = a;
        break
      }
    }
    return o
  }
  function y() {
    var e = navigator.userAgent
      , n = navigator.appVersion
      , t = "-"
      , o = [{
        s: "Windows 10",
        r: /(Windows 10.0|Windows NT 10.0)/
      }, {
        s: "Windows 8.1",
        r: /(Windows 8.1|Windows NT 6.3)/
      }, {
        s: "Windows 8",
        r: /(Windows 8|Windows NT 6.2)/
      }, {
        s: "Windows 7",
        r: /(Windows 7|Windows NT 6.1)/
      }, {
        s: "Windows Vista",
        r: /Windows NT 6.0/
      }, {
        s: "Windows Server 2003",
        r: /Windows NT 5.2/
      }, {
        s: "Windows XP",
        r: /(Windows NT 5.1|Windows XP)/
      }, {
        s: "Windows 2000",
        r: /(Windows NT 5.0|Windows 2000)/
      }, {
        s: "Windows ME",
        r: /(Win 9x 4.90|Windows ME)/
      }, {
        s: "Windows 98",
        r: /(Windows 98|Win98)/
      }, {
        s: "Windows 95",
        r: /(Windows 95|Win95|Windows_95)/
      }, {
        s: "Windows NT 4.0",
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
      }, {
        s: "Windows CE",
        r: /Windows CE/
      }, {
        s: "Windows 3.11",
        r: /Win16/
      }, {
        s: "Android",
        r: /Android/
      }, {
        s: "Open BSD",
        r: /OpenBSD/
      }, {
        s: "Sun OS",
        r: /SunOS/
      }, {
        s: "Linux",
        r: /(Linux|X11)/
      }, {
        s: "iOS",
        r: /(iPhone|iPad|iPod)/
      }, {
        s: "Mac OS X",
        r: /Mac OS X/
      }, {
        s: "Mac OS",
        r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
      }, {
        s: "QNX",
        r: /QNX/
      }, {
        s: "UNIX",
        r: /UNIX/
      }, {
        s: "BeOS",
        r: /BeOS/
      }, {
        s: "OS/2",
        r: /OS\/2/
      }, {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
      }];
    for (var r in o) {
      var i = o[r];
      if (i.r.test(e)) {
        t = i.s;
        break
      }
    }
    var a = "-";
    switch (/Windows/.test(t) && (a = /Windows (.*)/.exec(t)[1],
      t = "Windows"),
    t) {
      case "Mac OS X":
        a = /Mac OS X (10[._\d]+)/.exec(e)[1];
        break;
      case "Android":
        a = /Android ([._\d]+)/.exec(e)[1];
        break;
      case "iOS":
        a = (a = /OS (\d+)_(\d+)_?(\d+)?/.exec(n))[1] + "." + a[2] + "." + (0 | a[3])
    }
    return {
      os: t,
      osVersion: a
    }
  }
  function b(e) {
    var n = null
      , t = window;
    if (window === window.top)
      return null;
    window.parent !== window && window.parent !== window.top && (t = window.parent);
    for (var o = t.document.getElementsByTagName("div"), r = 0; r < o.length; r++) {
      var i = o[r];
      if (i.name === e) {
        n = i;
        break
      }
    }
    return n
  }
  function N(e, n) {
    if (e && n) {
      var t = n.x
        , o = n.y
        , r = n.w
        , i = n.h
        , a = n.marginLeft
        , d = n.marginTop
        , l = n.marginBottom
        , s = n.marginRight
        , c = 0;
      void 0 !== t ? c = t : void 0 !== a && (c = a);
      var u = 0;
      void 0 !== s && (u = s);
      var p = 0;
      void 0 !== o ? p = o : void 0 !== d && (p = d);
      var w = 0;
      void 0 !== l && (w = l),
        e.style.left = c + "px";
      if (e.name === 'goods_spec_info_select_frm') {
        e.style.bottom = "0px";
      } else {
        e.style.top = p + "px";
      }
      void 0 !== r && "auto" !== r ? e.style.width = r + "px" : e.style.right = u + "px",
        void 0 !== i && "auto" !== i ? e.style.height = i + "px" : e.style.bottom = w + "px"
    }
  }
  function E() {
    var e = document.createElement("iframe");
    // e.sandbox="allow-scripts allow-same-origin";
    // e.onload = function () {
    //     var n = e
    //         , t = n.contentWindow.document.createElement("script");
    //     t.type = "text/javascript",
    //         t.src = window.top.PUBLIC_PATH + window.top.WEB_ADAPTER_CORE_JS_PATH,
    //         n.contentWindow.document.body.appendChild(t)
    // }
    //     ,
    return e
  }
  function T(r) {
    var i = r.moduleName
      , a = r.method
      , d = r.isSync
      , l = r.params
      , s = r.cbId
      , c = r.callback
      , f = a
      , T = l || {}
      , C = c;
    if ("api" === i) {
      if ("screenWidth" === f)
        return window.top.innerWidth || window.top.document.documentElement.clientWidth || window.top.document.body.clientWidth;
      if ("screenHeight" === f)
        return window.top.innerHeight || window.top.document.documentElement.clientHeight || window.top.document.body.clientHeight;
      if ("winName" === f)
        return window === window.top ? "_apicloud_adapter" : window !== window.parent && window.parent !== window.top ? window.parent.name : window.name;
      if ("frameName" === f)
        return window === window.top ? "" : window !== window.parent && window.parent !== window.top ? window.name : "";
      if ("frameWidth" === f)
        return window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth;
      if ("frameHeight" === f)
        return window.frameElement ? parseFloat(window.frameElement.parentNode.style.height) : document.documentElement.clientHeight || document.body.clientHeight;
      if ("pageParam" === f) {
        // debugger
        // if(api.frameName.includes('order_status_')){
        //     debugger
        // }
        var key = api.frameName || api.winName;
        var value = localStorage.getItem(key);
        if (value === 'undefined') {
          value = "{}"
        }
        if (value === null) {
          value = "{}"
        }
        return JSON.parse(value);
        // return t(window.location.search);
      }
      if ("appParam" === f)
        return t(window.top.location.search);
      if ("wgtParam" === f)
        return t(window.top.location.search);
      if ("winWidth" === f)
        return window.top.innerWidth || window.top.document.documentElement.clientWidth || window.top.document.body.clientWidth;
      if ("winHeight" === f)
        return window.top.innerHeight || window.top.document.documentElement.clientHeight || window.top.document.body.clientHeight;
      if ("wgtRootDir" === f)
        return B;
      if ("appId" === f)
        return M.appId;
      if ("version" === f)
        return M.version;
      if ("appVersion" === f)
        return M.appVersion;
      if ("appName" === f)
        return M.appName;
      if ("systemType" === f)
        return y().os.toLowerCase();
      if ("systemVersion" === f)
        return y().osVersion;
      if ("uiMode" === f)
        return navigator.userAgent.match(/Tablet|iPad/i) ? "pad" : navigator.userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i) ? "phone" : "desk";
      if ("sendEvent" === f) {
        var O = T.name
          , _ = T.extra
          , F = new CustomEvent(O, {
            detail: _
          })
          , R = window.top;
        return k.ac_includes(O) && (R = window),
          T.targetWindow && (R = T.targetWindow),
          void R.document.dispatchEvent(F)
      }
      if ("alert" === f) {
        var X = T.title
          , j = (G = T.msg) || X || "";
        return alert(j),
          void C(s, {
            buttonIndex: 1
          }, null, !0)
      }
      if ("toast" === f) {
        var X = T.title
          , j = (G = T.msg) || X || "";
        return void alert(j)
      }
      if ("confirm" === f) {
        var X = T.title
          , j = (G = T.msg) || X || ""
          , V = confirm(j) ? 1 : 2;
        return void C(s, {
          buttonIndex: V
        }, null, !0)
      }
      if ("prompt" === f) {
        var X = T.title
          , G = T.msg
          , q = T.text
          , j = G || X || ""
          , Y = window.prompt(j, q);
        return void C(s, {
          buttonIndex: V = null === Y ? 1 : 2,
          text: Y
        }, null, !0)
      }
      if ("addEventListener" === f) {
        var J = function () {
          var e = T.name;
          if (!["swipedown", "swipeleft", "swiperight", "swipeup", "tap", "longpress"].ac_includes(e)) {
            var n = window.top;
            k.ac_includes(e) && (n = window),
              "scrolltobottom" === e && T.extra && (I = T.extra.threshold || 0);
            var t = function (n) {
              var t = n.detail || {}
                , o = {
                  value: t
                };
              A.ac_includes(e) && (o = t),
                C(s, o, null, !1)
            };
            return P[e] = {
              targetWindow: n,
              listener: t
            },
              n.document.addEventListener(e, t),
            {
              v: void 0
            }
          }
          return L && (L._cbIds[e] = s),
          {
            v: void 0
          }
        }();
        if ("object" == typeof J)
          return J.v
      }
      if ("removeEventListener" === f) {
        if (!["swipedown", "swipeleft", "swiperight", "swipeup", "tap", "longpress"].ac_includes(O = T.name)) {
          if (!P[O])
            return;
          var $ = P[O]
            , R = $.targetWindow
            , Z = $.listener;
          return void R.document.removeEventListener(O, Z)
        }
        return void (L && (L._cbIds[O] = null))
      }
      if ("imageCache" === f) {
        var K = T.url
          , Q = T.encode;
        void 0 === Q && (Q = !0);
        re = Q ? o(K) : K;
        return void C(s, {
          status: !0,
          url: re
        }, null, !0)
      }
      if ("openWin" === f) {
        // console.log(T);
        // debugger
        var K = T.url
          , ee = T.name
          , ne = T.bgColor
          , te = T.reload;
        Ee = (Ee = T.pageParam) || {},
          K = e(K);
        if ('{}' !== JSON.stringify(Ee)) {
          // ?????????
          localStorage.setItem(T.name, JSON.stringify(Ee));
          Ee = {};
        } else {
          localStorage.removeItem(T.name);
        }
        var oe = h(ee)
          , re = n({
            url: K,
            pageParam: Ee
          });
        if (oe)
          oe.contentWindow.location.href !== re ? oe.setAttribute("src", re) : te && oe.contentWindow.location.reload(!0),
            oe.parentNode.parentNode.appendChild(oe.parentNode);
        else {
          (We = document.createElement("span")).name = ee,
            We.style.width = U.winWidth + "px",
            We.style.left = "0px",
            We.style.top = "0px",
            We.style.height = U.winHeight + "px",
            We.style.position = "fixed",
            We.style.overflow = "scroll",
            We.style.zIndex = "1",
            We.style["-webkit-overflow-scrolling"] = "touch",
            ne && (We.style.background = ne);
          (ve = E()).setAttribute("src", re),
            ve.name = ee,
            ve.style.width = "100%",
            ve.style.height = "100%",
            ve.frameBorder = 0,
            We.appendChild(ve),
            window.top.document.getElementsByTagName("body")[0].appendChild(We),
            oe = ve
        }
        R = null;
        return window.parent === window.top && window.parent !== window && (R = window),
          window.parent.parent === window.top && window.parent.parent !== window.parent && window.parent !== window && (R = window.parent),
          void (R !== oe && U.sendEvent({
            name: "viewdisappear",
            targetWindow: R
          }))
      }
      if ("setWinAttr" === f) {
        var ne = T.bgColor
          , ie = U.winName;
        if (!ie)
          return;
        return void ((oe = h(ie)) && ne && (oe.parentNode.style.background = ne))
      }
      if ("ajax" === f) {
        var ae = function () {
          var e = T.method
            , n = T.url
            , t = T.headers
            , r = T.encode
            , i = T.data
            , a = T.tag
            , d = T.timeout
            , l = T.dataType
            , c = T.returnAll;
          void 0 === r && (r = !0),
            l = l || "json",
            e = i ? "post" : e;
          var u = r ? o(n) : n
            , p = new XMLHttpRequest;
          if (a && (W[a] = p),
            d && (p.timeout = d),
            p.addEventListener("load", function (e) {
              W[a] = null;
              var n = null;
              c ? n = {
                statusCode: p.statusCode,
                body: p.responseText
              } : (n = JSON.parse(p.responseText),
                "json" === l && (n = JSON.parse(p.responseText))),
                C(s, n, null, !0)
            }),
            p.open(e, u),
            t)
            for (var w in t)
              t.hasOwnProperty(w) && p.setRequestHeader(w, t[w]);
          var m = null;
          if (i && i.values) {
            var f = new FormData;
            for (var v in i.values)
              f.append(v, i.values[v]);
            if (i.files) {
              f.append('file', i.files.file);
            }
            m = f
          }
          return i && i.body && (m = "string" == typeof i.body ? i.body : JSON.stringify(i.body)),
            p.send(m),
          {
            v: void 0
          }
        }();
        if ("object" == typeof ae)
          return ae.v
      }
      if ("cancelAjax" === f) {
        if (!T.tag)
          return;
        var de = W[T.tag];
        return void (de && de.abort())
      }
      if ("require" === f) {
        return D[T]
      }
      if ("openFrameGroup" === f) {
        var le = T.frames
          , se = T.rect
          , ce = se.x
          , ue = se.y
          , pe = se.w;
        "auto" === (ye = se.h) && (ye = U.winHeight - ue),
          "auto" === pe && (pe = U.winWidth - ce);
        var we = T.index || 0
          , me = document.createElement("div");
        me.name = T.name,
          me.style.width = pe + "px",
          me.style.left = ce + "px",
          me.style.top = ue + "px",
          me.style.height = ye + "px",
          me.style.position = "fixed",
          T.background && (me.style.background = T.background);
        for (Ce = 0; Ce < le.length; Ce++) {
          var fe = le[Ce];
          (We = document.createElement("div")).name = fe.name,
            We.style.position = "absolute",
            We.style.left = "0px",
            We.style.top = "0px",
            We.style.width = "100%",
            We.style.height = ye + "px",
            We.style.overflow = "auto",
            We.style["-webkit-overflow-scrolling"] = "touch",
            Ce !== we && (We.style.visibility = "hidden");
          // debugger
          if ('{}' !== JSON.stringify(fe.pageParam)) {
            // ?????????
            localStorage.setItem(fe.name, JSON.stringify(fe.pageParam));
            fe.pageParam = {};
          } else {
            localStorage.removeItem(T.name);
          }
          var ve = E()
            , re = n({
              url: K = e(fe.url),
              pageParam: fe.pageParam
            });
          ve.setAttribute("src", re),
            ve.name = fe.name,
            ve.style.width = "100%",
            ve.style.height = "100%",
            ve.style.background = fe.bgColor,
            ve.frameBorder = 0,
            We.appendChild(ve),
            me.appendChild(We)
        }
        document.body.appendChild(me),
          me.cbId = s,
          me.frames = le;
        return void C((he = me).cbId, {
          name: he.frames[we].name,
          index: we
        }, null, !1)
      }
      if ("setFrameGroupIndex" === f) {
        var we = T.index
          , te = T.reload;
        if (!(be = b(T.name)))
          return;
        for (Ce = 0; Ce < be.children.length; Ce++) {
          Me = be.children[Ce];
          Ce !== we ? Me.style.visibility = "hidden" : (Me.style.visibility = "visible",
            te && Me.children[0].contentWindow.location.reload(!0))
        }
        var he = be;
        return void C(he.cbId, {
          name: he.frames[we].name,
          index: we
        }, null, !1)
      }
      if ("setFrameGroupAttr" === f) {
        if (!(be = b(T.name)))
          return;
        if (be.style.visibility = T.hidden ? "hidden" : "visible",
          T.rect) {
          var ge = T.rect
            , ce = ge.x
            , ue = ge.y
            , pe = ge.w
            , ye = ge.h;
          "auto" === ye && (ye = U.winHeight - ue),
            "auto" === pe && (pe = U.winWidth - ce),
            be.style.width = pe + "px",
            be.style.left = ce + "px",
            be.style.top = ue + "px",
            be.style.height = ye + "px";
          for (Ce = 0; Ce < be.children.length; Ce++) {
            be[Ce].style.height = ye + "px"
          }
        }
        return
      }
      if ("closeFrameGroup" === f) {
        var be = b(T.name);
        return void (be && be.remove())
      }
      if ("openFrame" === f) {
        // console.log(T);
        // debugger
        var ne = T.bgColor
          , Ne = T.name
          , Ee = T.pageParam
          , te = T.reload;
        K = e(K = T.url);
        if ('{}' !== JSON.stringify(Ee)) {
          // ?????????
          localStorage.setItem(T.name, JSON.stringify(Ee));
          Ee = {};
        } else {
          localStorage.removeItem(T.name);
        }
        var Te = g(oe = h(U.winName), Ne)
          , re = n({
            url: K,
            pageParam: Ee
          });
        if (Te)
          return Te.contentWindow.location.href !== re ? Te.setAttribute("src", re) : te && Te.contentWindow.location.reload(!0),
            Te.parentNode.parentNode.appendChild(Te.parentNode),
            N(Te.parentNode, T.rect),
            void (Te.parentNode.style.visibility = "visible");
        var We = document.createElement("span");
        We.name = Ne,
          N(We, T.rect),
          We.style.position = "fixed",
          We.style.zIndex = "1",
          We.style.overflow = "scroll",
          We.style["-webkit-overflow-scrolling"] = "touch";
        return (ve = E()).setAttribute("src", re),
          ve.name = Ne,
          ve.style.width = "100%",
          ve.style.height = "100%",
          // ve.style.height = We.style.height,
          ve.style.background = ne,
          ve.frameBorder = 0,
          We.appendChild(ve),
          void document.body.appendChild(We)
      }
      if ("bringFrameToFront" === f) {
        var Pe = g(Oe = h(U.winName), T.from)
          , Se = g(Oe, T.to);
        if (!Pe)
          return;
        Le = Pe.parentNode.parentNode;
        return Se ? void Le.insertBefore(Pe.parentNode, Se.parentNode.nextSibling) : void Le.appendChild(Pe.parentNode)
      }
      if ("sendFrameToBack" === f) {
        var Pe = g(Oe = h(U.winName), T.from)
          , Se = g(Oe, T.to);
        if (!Pe)
          return;
        Le = Pe.parentNode.parentNode;
        return Se ? void Le.insertBefore(Pe.parentNode, Se.parentNode) : void Le.insertBefore(Pe.parentNode, Pe.firstChild)
      }
      if ("closeFrame" === f) {
        if (window.parent !== window.top && window.parent !== window) {
          var xe = T && T.name ? T.name : U.frameName;
          return void window.parent.api.closeFrame({
            name: xe
          })
        }
        if (!T || !T.name)
          return;
        for (var Ae = T.name, ke = document.getElementsByTagName("iframe"), Ie = null, Ce = 0; Ce < ke.length; Ce++) {
          if ((Me = ke[Ce]).name === Ae) {
            Ie = Me;
            break
          }
        }
        try {
          void Ie.parentNode.remove()
        } catch (error) {
          let tempWindow = window[0];
          let tempName = window[0].name
          let parWindow = null;
          while (tempWindow[0]) {
            parWindow = tempWindow;
            tempName = tempWindow[0].name
            tempWindow = tempWindow[0];
          }
          // console.log(tempWindow);
          // console.log(tempName);
          // console.log(parWindow);
          parWindow.document.getElementsByName(tempName)[0].parentElement.remove()
        }
        return;
      }
      if ("setFrameAttr" === f) {
        var Oe = h(U.winName);
        if (!(Te = g(Oe, T.name || U.frameName)))
          return;
        var Le;
        return (Le = Te.parentNode).style.visibility = T.hidden ? "hidden" : "visible",
          T.rect && N(Le, T.rect),
          void (T.bgColor && (Le.style.background = T.bgColor))
      }
      if ("closeToWin" === f) {
        for (var _e = T && T.name ? T.name : U.winName, ke = window.top.document.getElementsByTagName("iframe"), Be = !1, He = null, Fe = [], Ce = 0; Ce < ke.length; Ce++) {
          Me = ke[Ce];
          Be && "" !== Me.name ? Fe.push(Me) : Me.name === _e && (Be = !0,
            He = Me)
        }
        for (Ce = 0; Ce < Fe.length; Ce++) {
          (Me = Fe[Ce]).parentNode.remove()
        }
        return void (He && U.sendEvent({
          name: "viewappear",
          targetWindow: He.contentWindow || He
        }))
      }
      if ("closeWin" === f) {
        if ("root" === (_e = T && T.name ? T.name : U.winName))
          return;
        for (var ke = window.top.document.getElementsByTagName("iframe"), Ie = null, He = null, Ce = 0; Ce < ke.length; Ce++) {
          var Me;
          if ((Me = ke[Ce]).name === _e) {
            Ie = Me;
            break
          }
          He = Me
        }
        return Ie.parentNode.remove(),
          void (He && U.sendEvent({
            name: "viewappear",
            targetWindow: He.contentWindow || He
          }))
      }
      if ("rebootApp" === f)
        return void (window.location.href = H);
      if ("setPrefs" === f)
        return void window.localStorage.setItem(T.key, T.value);
      if ("getPrefs" === f) {
        var De = window.localStorage.getItem(T.key);
        return T.sync ? De : void C(s, {
          value: De
        }, null, !0)
      }
      if ("removePrefs" === f)
        return void window.localStorage.removeItem(T.key);
      if ("mail" === f) {
        var Ue = T.recipients;
        if (!Ue || !Ue.length)
          return void C(s, {
            status: !1
          }, null, !0);
        var Re = "mailto:" + Ue[0] + "?subject=" + (T.subject || "") + "&body=" + (T.body || "");
        return "ios" === U.systemType && (Re = "mailto:" + Ue[0]),
          window.top.document.location.href = Re,
          void C(s, {
            status: !0
          }, null, !0)
      }
      if ("call" === f) {
        var Xe = "tel:" + T.number;
        return void (window.top.document.location.href = Xe)
      }
      if ("sms" === f) {
        var je = T.numbers;
        if (!je || !je.length)
          return void C(s, {
            status: !1
          }, null, !0);
        var Ve = "sms:" + je[0] + "?body=" + (T.text || "");
        return "ios" === U.systemType && (Ve = "sms:" + je[0]),
          window.top.document.location.href = Ve,
          void C(s, {
            status: !0
          }, null, !0)
      }
      if ("getLocation" === f || "startLocation" === f || "stopLocation" === f) {
        var ze = function () {
          if (!navigator.geolocation)
            return C(s, {
              status: !1
            }, null, !0),
            {
              v: void 0
            };
          if ("stopLocation" === f)
            return x && (navigator.geolocation.clearWatch(x),
              x = null),
            {
              v: void 0
            };
          var e = "getCurrentPosition"
            , n = !0;
          "startLocation" === f && (x && (navigator.geolocation.clearWatch(x),
            x = null),
            e = "watchPosition",
            n = !1);
          var t = {
            enableHighAccuracy: !0,
            timeout: 1 / 0,
            maximumAge: 0
          }
            , o = navigator.geolocation[e](function (e) {
              C(s, {
                status: !0,
                longitude: e.coords.longitude,
                latitude: e.coords.latitude,
                timestamp: e.timestamp
              }, null, n)
            }, function (e) {
              var t = "unknown error";
              switch (e.code) {
                case e.PERMISSION_DENIED:
                  t = "User denied the request for Geolocation";
                  break;
                case e.POSITION_UNAVAILABLE:
                  t = "Location information is unavailable";
                  break;
                case e.TIMEOUT:
                  t = "The request to get user location timed out";
                  break;
                case e.UNKNOWN_ERROR:
                  t = "An unknown error occurred"
              }
              C(s, {
                status: !1
              }, {
                msg: t
              }, n)
            }, t);
          return "startLocation" === f && (x = o),
          {
            v: void 0
          }
        }();
        if ("object" == typeof ze)
          return ze.v
      }
      if ("startSensor" === f || "stopSensor" === f)
        return window.DeviceMotionEvent ? (S || (S = function (e) {
          var n = {
            status: !0,
            x: e.acceleration.x,
            y: e.acceleration.y,
            z: e.acceleration.z,
            proximity: !1
          };
          C(s, n, null, !1)
        }
        ),
          "startSensor" === f && window.addEventListener("devicemotion", S),
          void ("stopSensor" === f && (window.removeEventListener("devicemotion", S),
            S = null))) : void C(s, {
              status: !1
            }, {
              msg: "Not Support DeviceMotionEvent"
            }, !0)
    }
    if ("pageUp" !== f)
      if ("pageDown" !== f)
        if ("parseTapmode" !== f)
          if ("execScript" !== f) {
            if (d)
              return null;
            c(s, null, {}, !0)
          } else {
            var Ge = T.script
              , qe = v({
                winName: T.name,
                frameName: Ae = T.frameName
              });
            qe && qe.contentWindow.eval(Ge)
          }
        else {
          if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
            return;
          var Ye = document.querySelectorAll("[" + z + "]");
          if (Ye)
            for (Ce = 0; Ce < Ye.length; Ce++) {
              var Je = Ye[Ce];
              Je.uzonclick || Je.onclick && (Je.uzonclick = Je.onclick,
                Je.onclick = null,
                Je.addEventListener("touchstart", u, !1),
                Je.addEventListener("touchmove", p, !1),
                Je.addEventListener("touchend", w, !1),
                Je.addEventListener("touchcancel", m, !1))
            }
        }
      else {
        var $e = document.body.offsetHeight - U.frameHeight;
        if ($e === window.scrollY && "ios" !== U.systemType)
          return void C(s, {
            scrolled: !1
          }, null, !0);
        if (T.bottom ? window.scrollBy(0, $e) : window.scrollBy(0, U.frameHeight),
          "ios" === U.systemType && window.frameElement) {
          if ($e === window.frameElement.parentNode.scrollTop)
            return void C(s, {
              scrolled: !1
            }, null, !0);
          if (T.bottom)
            window.frameElement.parentNode.scrollTop = $e;
          else {
            Ze = window.frameElement.parentNode.scrollTop + U.frameHeight;
            Ze > $e && (Ze = $e),
              window.frameElement.parentNode.scrollTop = Ze
          }
        }
        C(s, {
          scrolled: !0
        }, null, !0)
      }
    else {
      if (0 === window.scrollY && "ios" !== U.systemType)
        return void C(s, {
          scrolled: !1
        }, null, !0);
      if (T.top ? window.scrollTo(0, 0) : window.scrollBy(0, -U.frameHeight),
        "ios" === U.systemType && window.frameElement) {
        if (0 === window.frameElement.parentNode.scrollTop)
          return void C(s, {
            scrolled: !1
          }, null, !0);
        if (T.top)
          window.frameElement.parentNode.scrollTop = 0;
        else {
          var Ze;
          (Ze = window.frameElement.parentNode.scrollTop - U.frameHeight) < 0 && (Ze = 0),
            window.frameElement.parentNode.scrollTop = Ze
        }
      }
      C(s, {
        scrolled: !0
      }, null, !0)
    }
  }
  Array.prototype.ac_includes = Array.prototype.includes || function (e) {
    return -1 !== this.indexOf(e)
  }
    ;
  var W = {}
    , P = {}
    , S = null
    , x = null
    , A = ["online", "offline", "shake", "appintent"]
    , k = ["scrolltobottom", "appintent", "viewappear", "viewdisappear"]
    , I = 0
    , C = null
    , O = !0
    , L = null
    , _ = window.Hammer;
  void 0 !== _ && ((L = new _(window.document))._cbIds = {},
    L.on("tap", function (e) {
      var n = L._cbIds.tap;
      n && i(n, {}, null, !1)
    }),
    L.on("swipeleft", function (e) {
      var n = L._cbIds.swipeleft;
      n && i(n, {}, null, !1)
    }),
    L.on("swiperight", function (e) {
      var n = L._cbIds.swiperight;
      n && i(n, {}, null, !1)
    }),
    L.on("press", function (e) {
      var n = L._cbIds.press;
      n && i(n, {}, null, !1)
    }));
  var B = window.top.PUBLIC_PATH
    , H = window.top.PUBLIC_PATH + window.top.WEB_ADAPTER_INDEX_PATH
    , F = window.top.PUBLIC_PATH + window.top.APP_INDEX_PATH
    , M = window.top.APP_INFO;
  window === window.top && M.appName && (window.document.title = M.appName);
  var D = window.top.MODULES_INFO.reduce(function (e, n) {
    var t = n.name
      , o = n.methods
      , r = n.syncMethods;
    return o && (e[t] = o.reduce(function (e, n) {
      return e[n] = function () {
        return a("UZAPI", n, arguments, !1, t, !0)
      }
        ,
        e
    }, {})),
      r && (e[t] = r.reduce(function (e, n) {
        return e[n] = function () {
          return a("UZAPI", n, arguments, !0, t, !0)
        }
          ,
          e
      }, e[t])),
      e
  }, {})
    , U = {};
  window.api = U,
    window.os = {
      localStorage: function () {
        return window.localStorage
      }
    };
  window.uz$q = {
    c: [],
    flag: !0
  };
  var R = {
    fn: {},
    id: 1,
    on: function (e, n, t, o) {
      this.fn[e] && (this.fn[e](n, t),
        o && delete this.fn[e])
    }
  };
  window.uz$cb = R,
    window.onResultCallback = i,
    window._onResultCallback = r,
    window.uzsetTmpValue = function (e, n) {
      X[e] = n
    }
    ,
    window.uzgetTmpValue = function (e) {
      return X[e]
    }
    ,
    window.uzremoveTmpValue = function (e) {
      delete X[e]
    }
    ;
  var X = {};
  window.uz$tmpValues = X;
  window.uz$md = {},
    window._executeModuleMethod = d,
    window.api = U,
    function (e, n) {
      for (var t = ["connectionType", "jailbreak", "fullScreen", "channel", "debug", "fsDir", "cacheDir", "boxDir", "deviceId", "deviceModel", "deviceName", "operator", "statusBarAppearance", "deviceToken"], o = ["appId", "appName", "appVersion", "systemType", "systemVersion", "version", "deviceId", "deviceToken", "deviceModel", "deviceName", "uiMode", "operator", "connectionType", "fullScreen", "screenWidth", "screenHeight", "winName", "winWidth", "winHeight", "frameName", "frameWidth", "frameHeight", "pageParam", "wgtParam", "appParam", "statusBarAppearance", "wgtRootDir", "fsDir", "cacheDir", "boxDir", "debug", "channel", "jailbreak"].filter(function (e) {
        return !t.ac_includes(e)
      }), r = function (t) {
        var r = o[t];
        Object.defineProperty(e, r, {
          get: function () {
            return n("UZAPI", r, arguments, !0, "api")
          }
        }),
          O && void 0 === e[r] && console.error(r + " ????????????????????????!")
      }, i = 0; i < o.length; i++)
        r(i)
    }(U, a),
    function (e, n) {
      var t = ["openWin", "closeWin", "closeToWin", "setWinAttr", "openFrame", "closeFrame", "setFrameAttr", "bringFrameToFront", "sendFrameToBack", "setFrameClient", "animation", "openFrameGroup", "closeFrameGroup", "setFrameGroupAttr", "setFrameGroupIndex", "openPopoverWin", "closePopoverWin", "openSlidLayout", "openSlidPane", "closeSlidPane", "lockSlidPane", "unlockSlidPane", "openDrawerLayout", "openDrawerPane", "closeDrawerPane", "loadData", "execScript", "removeLaunchView", "parseTapmode", "installApp", "uninstallApp", "openApp", "appInstalled", "rebootApp", "openWidget", "closeWidget", "ajax", "cancelAjax", "download", "cancelDownload", "imageCache", "readFile", "writeFile", "setPrefs", "getPrefs", "removePrefs", "clearCache", "getCacheSize", "getTotalSpace", "getFreeDiskSpace", "loadSecureValue", "addEventListener", "removeEventListener", "sendEvent", "accessNative", "notification", "cancelNotification", "startLocation", "stopLocation", "getLocation", "startSensor", "stopSensor", "call", "sms", "mail", "openContacts", "setFullScreen", "setStatusBarStyle", "setScreenOrientation", "setKeepScreenOn", "toLauncher", "setScreenSecure", "setAppIconBadge", "getPhoneNumber", "alert", "confirm", "prompt", "actionSheet", "showProgress", "hideProgress", "toast", "openPicker", "setRefreshHeaderInfo", "setCustomRefreshHeaderInfo", "refreshHeaderLoading", "refreshHeaderLoadDone", "showFloatBox", "getPicture", "saveMediaToAlbum", "startRecord", "stopRecord", "startPlay", "stopPlay", "openVideo", "require", "historyBack", "historyForward", "pageUp", "pageDown"];
      t.push("getModule");
      for (var o = [], r = ["openApp", "setPrefs", "getPrefs", "removePrefs", "loadSecureValue", "readFile", "writeFile", "setFullScreen", "getCacheSize", "getTotalSpace", "getFreeDiskSpace", "getPhoneNumber", "getModule"], i = t.filter(function (e) {
        return !o.ac_includes(e)
      }), a = function (t) {
        var o = i[t];
        e[o] = function () {
          return n("UZAPI", o, arguments, r.ac_includes(o), "api", !0)
        }
      }, d = 0; d < i.length; d++)
        a(d)
    }(U, a),
    window.getInitialScale = function () {
      var e = document.querySelector('meta[name="viewport"]');
      if (e) {
        var n = e.getAttribute("content").match(/initial-scale=([\d.]+)/);
        if (n)
          return parseFloat(n[1])
      }
      return 1
    }
    ,
    document.documentElement.style.webkitTouchCallout = "none",
    document.documentElement.style.webkitUserSelect = "none",
    window.getContentFromArg = function (e) {
      var n = void 0
        , t = Array.prototype.slice.call(e);
      if (t.length >= 1 && (null === t[0] ? t[0] = "null" : void 0 === t[0] ? t[0] = "undefined" : t[0] = t[0].toString()),
        t.length > 1) {
        var o = 1;
        for (0 === t[0].indexOf("%c") && (t[0] = t[0].replace(/%c/, ""),
          o = 2); o < t.length && /%s|%d|%i|%o/.test(t[0]); o++)
          t[0] = t[0].replace(/%s|%d|%i|%o/, t[o]);
        o < t.length && (t[0] = t[0] + " " + t.slice(o).join(" ")),
          n = t[0]
      } else
        n = 1 === t.length ? t[0] : "";
      return n
    }
    ,
    window.shouldDismissKeyboardOnTap = function (e, n) {
      var t = document.elementFromPoint(e, n);
      return !t || "INPUT" !== t.tagname && "TEXTAREA" !== t.tagname && "SELECT" !== t.tagname && "true" !== t.getAttribute("contenteditable")
    }
    ,
    window.getActiveElementFrame = function () {
      var e = document.activeElement;
      if (e && ("INPUT" === e.tagname || "TEXTAREA" === e.tagname || "SELECT" === e.tagname || "true" === e.getAttribute("contenteditable"))) {
        for (var n = e.offsetTop, t = e.offsetParent; null !== t;)
          n += t.offsetTop,
            t = t.offsetParent;
        var o = {
          y: n,
          h: e.offsetHeight
        };
        return JSON.stringify(o)
      }
      return ""
    }
    ;
  var j = 0;
  if (window.top !== window) {
    document.addEventListener("touchmove", function (e) {
      (function () {
        // console.log('touchmove');
        var e = window.scrollY;
        "ios" === U.systemType && window.frameElement && (e = window.frameElement.parentNode.scrollTop);
        var n = document.body.offsetHeight - (U.frameHeight + e)
          , t = !1
          , o = document.body.offsetHeight - U.frameHeight;
        return I < o && (o = I),
          null === C && (C = o),
          n < C && n <= o && C >= o && (t = !0),
          C = n,
          t
        // var timestamp = window.timestamp
        // if (timestamp) {
        //     if (new Date().getTime() > timestamp + 2000 * 3) {
        //         window.timestamp = new Date().getTime();
        //         return true
        //     } else {
        //         return false
        //     }
        // } else {
        //     window.timestamp = new Date().getTime();
        //     return true
        // }
        // return true
      }
      )() && U.sendEvent({
        name: "scrolltobottom"
      })
    }, !1),
      window.$api && (window.$api.fixStatusBar = function (e) { }
      );
    var V = 5
      , z = "tapmode";
    l();
    var G = function () { };
    U.parseTapmode()
  } else if (window.location.pathname !== H) {
    var q = n({
      url: H,
      pageParam: {
        targetUrl: window.location.pathname
      }
    });
    window.location.href = q
  } else {
    window.addEventListener("online", function () {
      U.sendEvent({
        name: "online",
        extra: {
          connectionType: null
        }
      })
    }),
      window.addEventListener("offline", function () {
        U.sendEvent({
          name: "offline"
        })
      });
    new window.Shake({
      threshold: 15,
      timeout: 3e3
    }).start(),
      window.addEventListener("shake", function () {
        U.sendEvent({
          name: "shake"
        })
      }, !1),
      U.openWin({
        name: "root",
        url: F
      })
  }
}();
