import './assets/css/aui.css';
import './assets/css/aui-flex.css';
import './assets/css/iconfont.less';
import './assets/css/iconfont.css';
import './assets/css/ali_icon_fu/iconfont.less';
import './assets/css/ali_icon_wancll/iconfont.less';
import './index.less';

const clientId = `AfT8aC1gkayVTl9gP4PBbifGpV9e1Ki-NBG8BN1wxNSpQW_N2-accMva485YaNZpVFjmZVQOjchOpHxi`;
const currency = `USD`;
const src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
const script = document.createElement('script');
script.src = src;
