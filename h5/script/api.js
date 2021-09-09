/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */

// let script = document.createElement('script');
// script.src = "../web_adapter/script/adapter.js";
// document.body.appendChild(script);
window.addEventListener('load', function () {
    let script = document.createElement('script');
    script.src = "../web_adapter/script/adapter.js";
    document.body.appendChild(script);
})

function apiadapter(payload) {
    /* TODO: 自定义的处理逻辑. */
    /*
    当 frame, window, adapter 级别同时实现此函数时,
    加载优先级为: frame > window > adapter > 内置默认实现
    
    @payload:
    @moduleName 模块名.
    @method     方法名.
    @isSync     是否是同步方法.
    @params     调用模块方法时的参数.
    @frameDom   frame 所在的 window dom对象.
    @winDom     window 所在页面的 window dom 对象.
    @apiDom     adapter 所在页面的 window dom 对象.
    @cbId       调用模块方法时,传递的回调函数的唯一标识.
    @callback   用于异步返回值的回调函数.(cbId, ret, err, del)=>{}
    @cbId   调用模块方法时,传递的回调函数的唯一标识.
    @ret    模块返回值.
    @err    错误信息.
    @del    调用后,是否删除此 cbId 对应的回调函数.
    删除后,下一次基于同一 cbId调用callback,
    将无法正确回传返回值.
    
    @return: 不作处理.如果不想处理某个模块方法, 应该显式返回字符串 'TO_NEXT_API_ADAPTER',
    以便往上传播调用.
    */
    if ("setRefreshHeaderInfo" === payload.method) {
        let link = document.createElement('link');
        link.href = "../css/minirefresh.min.css"
        link.rel = "stylesheet"
        document.body.appendChild(link);
        let script = document.createElement('script');
        script.src = "../script/minirefresh.js";
        script.onload = function () {
            // let html = document.body.innerHTML;
            // html = `<div id="minirefresh" class="minirefresh-wrap">
            //     <div class="minirefresh-scroll">${html}</div>
            // </div>`
            // document.body.innerHTML = html;
            let down = [...document.querySelectorAll('script')].findIndex(value => {
                return value.textContent.trim().includes('\'setRefreshHeaderInfo\'') || value.textContent.trim().includes('\"setRefreshHeaderInfo\"')
            })

            let up = [...document.querySelectorAll('script')].findIndex(value => {
                return value.textContent.trim().includes('scrolltobottom')
            })
            console.log(`down:${down}`);
            console.log(`up:${up}`);
            let config = {
                container: '#minirefresh',
                down: {
                    //isAuto: true,
                    callback: function () {
                        // 下拉事件
                        api.sendEvent({
                            name: 'setRefreshHeaderInfo',
                        });
                        // miniRefresh.endDownLoading();
                    }
                },
                up: {
                    //isAuto: false,
                    callback: function () {
                        // 上拉事件
                        // app.getData();
                        api.sendEvent({
                            name: 'scrolltobottom',
                        });
                        // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求

                        // miniRefresh.endUpLoading(true);
                    }
                }
            }
            if (down == -1) {
                config.down.callback = function () {
                    console.log('config.down.callback')
                    window.miniRefresh.endDownLoading(true);

                    let ele = document.querySelector('.minirefresh-theme-default .minirefresh-downwrap');
                    ele && ele.parentNode.removeChild(ele)
                };
            }
            if (up == -1) {
                config.up.callback = function () {
                    console.log('config.up.callback')
                    window.miniRefresh.endUpLoading(true);
                    let ele = document.querySelector('.minirefresh-theme-default .minirefresh-upwrap');
                    ele && ele.parentNode.removeChild(ele)
                };
            }
            console.log(config);
            window.miniRefresh = new MiniRefresh(config);
        }
        document.body.appendChild(script);


    }
    if (payload.moduleName === 'UILoading') {
        if (payload.method == 'closeFlower') {
            window.loadingHide();
        } else {
            window.loadingShow();
            return {
                id: 1,
            }
        }
    }

    // loadingShow();
    // closeFlower
    // flower
    /* 默认不作处理. */
    let whiteArray = ['api']
    if (whiteArray.includes(payload.moduleName)) {
        return "TO_NEXT_API_ADAPTER";
    }
    return "TO_NEXT_API_ADAPTER";
}
// 异步方法的返回值,最好通过传入的 callback 和 cbId 传递.
// 同步方法的返回值,可以直接 return 返回相关值.
// 在处理 UI 类模块时,可在模块方法调用时添加一些自定义字段,以便于 apiadapter 能正确处理 UI 类模块的位置.如添加一个新的 parentDomId 字段,以便能自定义指定模块的父元素.


// loading plugs
(() => {
    const html = `
    <div class="loading-dshkfhdsohls">
<div class="loading-dshkfhdsohls-container">
    <div class="loading-dshkfhdsohls-container-bar"></div>
</div>
</div>
    `
    const style = `
    <style>
    .loading-dshkfhdsohls {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: none;
        z-index:100;
        // background:rgba(0,0,0,.3)
    }

    .loading-dshkfhdsohls-container {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .loading-dshkfhdsohls-container-bar {
        width: 40px;
        height: 40px;
        border: 1px solid transparent;
        border-left-color: #666;
        border-radius: 50%;
        -webkit-animation: loading_dshkfhdsohls_container_bar 1s infinite linear;
        animation: loading_dshkfhdsohls_container_bar 1s infinite linear;
    }

    @-webkit-keyframes loading_dshkfhdsohls_container_bar {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }

        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes loading_dshkfhdsohls_container_bar {
        from {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }

        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
    `
    const div = document.createElement('div');
    div.innerHTML = html + style;
    document.body.appendChild(div);
    const loading = document.querySelector('.loading-dshkfhdsohls');
    function loadingShow() {
        loading.style.display = 'block';
    }

    function loadingHide() {
        loading.style.display = 'none';
    }
    window.loadingHide = loadingHide;
    window.loadingShow = loadingShow;
    // loadingShow();
    // closeFlower
    // flower
})();


(function (window) {
    var u = {};
    // var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function () {
        var ls = window.localStorage;
        // if (isAndroid) {
        //     ls = os.localStorage();
        // }
        return ls;
    };
    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof (data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof (fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }
    u.trim = function (str) {
        if (String.prototype.trim) {
            return str == null ? "" : String.prototype.trim.call(str);
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    u.trimAll = function (str) {
        return str.replace(/\s*/g, '');
    };
    u.isElement = function (obj) {
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function (obj) {
        if (JSON.stringify(obj) === '{}') {
            return true;
        }
        return false;
    };
    u.addEvt = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function (el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function () {
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function (el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelector) {
                return document.querySelector(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelector) {
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function (el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelectorAll) {
                return document.querySelectorAll(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelectorAll) {
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function (id) {
        return document.getElementById(id);
    };
    u.first = function (el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':first-child');
        }
    };
    u.last = function (el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':last-child');
        }
    };
    u.eq = function (el, index) {
        return this.dom(el, ':nth-child(' + index + ')');
    };
    u.not = function (el, selector) {
        return this.domAll(el, ':not(' + selector + ')');
    };
    u.prev = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function (el, selector) {
        if (!u.isElement(el)) {
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function (doms, el) {
            var i = 0, len = doms.length;
            for (i; i < len; i++) {
                if (doms[i].isSameNode(el)) {
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function (el, selector) {
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while (!targetDom) {
                el = el.parentNode;
                if (el != null && el.nodeType == el.DOCUMENT_NODE) {
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function (parent, el) {
        var mark = false;
        if (el === parent) {
            mark = true;
            return mark;
        } else {
            do {
                el = el.parentNode;
                if (el === parent) {
                    mark = true;
                    return mark;
                }
            } while (el === document.body || el === document.documentElement);

            return mark;
        }

    };
    u.remove = function (el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function (el, name, value) {
        if (!u.isElement(el)) {
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length == 2) {
            return el.getAttribute(name);
        } else if (arguments.length == 3) {
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function (el, name) {
        if (!u.isElement(el)) {
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            el.removeAttribute(name);
        }
    };
    u.hasCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if (el.className.indexOf(cls) > -1) {
            return true;
        } else {
            return false;
        }
    };
    u.addCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.add(cls);
        } else {
            var preCls = el.className;
            var newCls = preCls + ' ' + cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.remove(cls);
        } else {
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function (el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.toggle(cls);
        } else {
            if (u.hasCls(el, cls)) {
                u.removeCls(el, cls);
            } else {
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function (el, val) {
        if (!u.isElement(el)) {
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            switch (el.tagName) {
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if (arguments.length === 2) {
            switch (el.tagName) {
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }

    };
    u.prepend = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function (el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.innerHTML;
        } else if (arguments.length === 2) {
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function (el, txt) {
        if (!u.isElement(el)) {
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.textContent;
        } else if (arguments.length === 2) {
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function (el, css) {
        if (!u.isElement(el)) {
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if (typeof css == 'string' && css.indexOf(':') > 0) {
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function (el, prop) {
        if (!u.isElement(el)) {
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function (json) {
        if (typeof json === 'object') {
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function (str) {
        if (typeof str === 'string') {
            return JSON && JSON.parse(str);
        }
    };
    u.setStorage = function (key, value) {
        if (arguments.length === 2) {
            var v = value;
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function (key) {
        var ls = uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) { return; }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function (key) {
        var ls = uzStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    };
    u.clearStorage = function () {
        var ls = uzStorage();
        if (ls) {
            ls.clear();
        }
    };
    u.fixIos7Bar = function (el) {
        return u.fixStatusBar(el);
    };
    u.fixStatusBar = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return 0;
        }
        el.style.paddingTop = api.safeArea ? api.safeArea.top + 'px' : 0;
        return el.offsetHeight;
    };
    u.fixTabBar = function (el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixTabBar Function need el param, el param must be DOM Element');
            return 0;
        }
        el.style.paddingBottom = api.safeArea ? api.safeArea.bottom + 'px' : 0;
        return el.offsetHeight;
    };
    u.toast = function (title, text, time) {
        var opts = {};
        var show = function (opts, time) {
            api.showProgress(opts);
            setTimeout(function () {
                api.hideProgress();
            }, time);
        };
        if (arguments.length === 1) {
            var time = time || 500;
            if (typeof title === 'number') {
                time = title;
            } else {
                opts.title = title + '';
            }
            show(opts, time);
        } else if (arguments.length === 2) {
            var time = time || 500;
            var text = text;
            if (typeof text === "number") {
                var tmp = text;
                time = tmp;
                text = null;
            }
            if (title) {
                opts.title = title;
            }
            if (text) {
                opts.text = text;
            }
            show(opts, time);
        }
        if (title) {
            opts.title = title;
        }
        if (text) {
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function (/*url,data,fnSuc,dataType*/) {
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        argsToJson.data && (json.data = argsToJson.data);
        if (argsToJson.dataType) {
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text' || type == 'json') {
                json.dataType = type;
            }
        } else {
            json.dataType = 'json';
        }
        json.method = 'post';
        api.ajax(json,
            function (ret, err) {
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };
    u.get = function (/*url,fnSuc,dataType*/) {
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        //argsToJson.data && (json.data = argsToJson.data);
        if (argsToJson.dataType) {
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text' || type == 'json') {
                json.dataType = type;
            }
        } else {
            json.dataType = 'text';
        }
        json.method = 'get';
        api.ajax(json,
            function (ret, err) {
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };

    /*end*/


    window.$api = u;

})(window);


