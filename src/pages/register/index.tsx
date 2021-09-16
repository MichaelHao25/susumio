import Header from '@/component/Header';
import './index.less';
import { history } from 'umi';

export default () => {
  return (
    <div className="register">
      <Header title={'Registro'} />
      <div className="aui-content aui-text-center">
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
        <div className="area">
          <div className="mix">
            <i
              className="iconfont icon-shouji"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type="tel"
              className="input"
              placeholder="Número de teléfono"
              value="mobile"
              id="mobile"
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
              // v-if="passwordFlag"
              style={{
                color: '#bbbbbb',
                fontSize: '20px',
                marginRight: '0.7rem',
              }}
            />
            {/*@click="showOrHidePassword"*/}
            <i
              className="iconfont icon-yanjing_xianshi"
              // v-if="!passwordFlag"
              style={{
                color: '#bbbbbb',
                fontSize: '20px',
                marginRight: '0.7rem',
              }}
            />
            {/*@click="showOrHidePassword"*/}
          </div>
          <div className="other">
            <p
              onClick={() => {
                history.push('/loginEmail');
              }}
            >
              Login (Email)
            </p>
            {/*onclick="$util.openWindow('message_auth_login_win')"*/}
            <p
              style={{ marginLeft: '5.2rem' }}
              onClick={() => {
                history.push('/login');
              }}
            >
              Login (Cuenta)
            </p>
            {/*onclick="$util.openWindow('login_win')"*/}
          </div>
          <div className="submit1" style={{ backgroundColor: '#3fa0f9' }}>
            {/*tapmode onclick="app.doRegister()"*/}
            Registro
          </div>
          <div className="privacy_clause">
            <input
              className="aui-checkbox"
              type="checkbox"
              style={{
                width: '0.8rem',
                height: '0.8rem',
                marginRight: '0.6rem',
              }}
            />
            {/*:checked="checkedFlag" @click="checkedFlag=!checkedFlag"*/}
            <div style={{ fontSize: '0.6rem', color: '#757575' }}>
              Acuerdo
              <span
                className="aui-font-weight"
                style={{ textDecoration: 'underline', fontStyle: 'italic' }}
              >
                Condiciones de
                {/*@click="goRule(5)"*/}
                servicio
              </span>
              Y{/*@click="goRule(6)"*/}
              <span
                className="aui-font-weight"
                style={{ textDecoration: 'underline', fontStyle: 'italic' }}
              >
                Política de privacidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
