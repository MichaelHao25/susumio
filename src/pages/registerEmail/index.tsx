import Header from '@/component/Header';
import './index.less';
import { history } from 'umi';

export default () => {
  return (
    <div className="registerEmail">
      <Header title={'Registro Email'} />
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
          {/*onclick="api.closeWin()"*/}
        </div>
        <div className="area">
          {/* <div class="mix" v-if="is_open_bonus || is_open_drp">
                    <i class="aui-iconfont aui-icon-mobile"></i>
                    <input type="text" class="input" pattern="[0-9]*" @keyup="recoMobileChange()" placeholder="输入推荐人手机号码(选填)" v-model="reco_mobile">
                </div>
                <div class="tips aui-text-left" v-if="openid">请注册绑定手机号,下次可直接用第三方账号登录</div> */}
          <div className="mix">
            <i
              className="iconfont icon-youxiang"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type="input"
              className="input"
              placeholder="Correo electrónico"
              v-model="email"
              id="email"
            />
          </div>
          <div className="mix">
            <i
              className="iconfont icon-mima"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type={'password'}
              className="input"
              value="password"
              placeholder="Contraseña"
              id="password"
            />
            {/*:type="typeValue"*/}
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
              Y
              <span
                className="aui-font-weight"
                style={{ textDecoration: 'underline', fontStyle: 'italic' }}
              >
                Política de
                {/*@click="goRule(6)" */}
                privacidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
