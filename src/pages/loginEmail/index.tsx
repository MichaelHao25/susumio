import Header from '@/component/Header';
import './index.less';
import { history } from 'umi';

export default () => {
  return (
    <div className="messageAuthLogin">
      <Header title={'Código de verificación de mensajes'} />
      <div className="area aui-text-center">
        <div
          style={{
            height: '7.5rem',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://www.177pinche.com/public/upload/user_images/20190701/52f0b7ea6656a4af7484d6503e2f0a51.png"
            style={{ width: '60%' }}
          />
        </div>
        <div className="mix">
          <i
            className="iconfont icon-youxiang"
            style={{ color: '#3fa0f9', fontSize: '20px' }}
          />
          <input
            type="input"
            className="input"
            placeholder="Correo electrónico"
            value="email"
            id="email"
          />
        </div>
        <div className="mix">
          <i
            className="iconfont icon-mima"
            style={{ color: '#3fa0f9', fontSize: '20px' }}
          />
          <input
            type="password"
            className="input"
            value="password"
            placeholder="Contraseña"
            id="password"
          />
          <i
            className="iconfont icon-yanjing_yincang"
            v-if="passwordFlag"
            style={{
              color: '#bbbbbb',
              fontSize: '20px',
              marginRight: '0.7rem',
            }}
          />
          {/*click="showOrHidePassword"*/}
          <i
            className="iconfont icon-yanjing_xianshi"
            v-if="!passwordFlag"
            style={{
              color: '#bbbbbb',
              fontSize: '20px',
              marginRight: '0.7rem',
            }}
          />
          {/*click="showOrHidePassword"*/}
        </div>
        <div className="other">
          <p
            onClick={() => {
              history.push('/login');
            }}
          >
            Código de cuenta
          </p>
          {/*click="$util.openWindow('login_win')"*/}
        </div>
        <div className="submit1" style={{ backgroundColor: '#3fa0f9' }}>
          Entrada
        </div>
        {/*click="app.doLogin()"*/}
      </div>
    </div>
  );
};
