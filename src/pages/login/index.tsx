import Header from '@/component/Header';
import './index.less';

export default function goodsListNewPage() {
  return (
    <div className="login">
      <Header title={'Entrada'} />

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
          {/*onclick="api.closeWin()"*/}
        </div>
        <div className="mix">
          <i
            className="iconfont icon-shouji"
            style={{ color: '#3fa0f9', fontSize: '20px' }}
          />
          <input
            type="tel"
            className="input"
            placeholder="Número de teléfono"
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
            placeholder="Contraseña"
            id="password"
          />
          <i
            className="iconfont icon-yanjing_yincang"
            style={{
              color: '#bbbbbb',
              fontSize: '20px',
              marginRight: '0.7rem',
            }}
          />
          {/*@click="showOrHidePassword"*/}
          <i
            className="iconfont icon-yanjing_xianshi"
            style={{
              color: '#bbbbbb',
              fontSize: '20px',
              marginRight: '0.7rem',
            }}
          />
          {/*@click="showOrHidePassword"*/}
        </div>
        <div className="other" style={{ justifyContent: 'space-between' }}>
          <div>Acceso por correo</div>
          {/*onclick="$util.openWindow('message_auth_login_win')"*/}
        </div>
        <div className="submit1" style={{ backgroundColor: '#3fa0f9' }}>
          Listo
        </div>
        {/*onclick="app.doLogin()"*/}
        <div className="rigster" style={{ backgroundColor: '#fff' }}>
          Registro
          {/*onclick="$util.openWindow('register_win')"*/}
        </div>
        <div className="rigster" style={{ backgroundColor: '#fff' }}>
          Registro Email
        </div>
        {/*onclick="$util.openWindow('register_email_win')"*/}
      </div>
    </div>
  );
}
