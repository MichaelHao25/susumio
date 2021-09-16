import Header from '@/component/Header';
import './index.less';
import { history } from 'umi';
import { postApiUsersUserAccountsLogin } from '@/services/api';
import { useState } from 'react';
import { failure, Report } from 'notiflix';

export default function goodsListNewPage() {
  const [mobile, setMobile] = useState<string>('18600899806');
  const [password, setPassword] = useState<string>('123456');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function handleSubmit() {
    postApiUsersUserAccountsLogin({
      mobile,
      password,
    }).then((res) => {
      console.log(res);
      const { code = 0 } = res;
      Report.failure('Error', res.msg, 'OK');
    });
  }

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
            value={mobile}
            className="input"
            placeholder="Número de teléfono"
            id="mobile"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
        </div>
        <div className="mix">
          <i
            className="iconfont icon-mima"
            style={{ color: '#3fa0f9', fontSize: '20px' }}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            className="input"
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            id="password"
          />
          <i
            className={`iconfont ${
              showPassword ? 'icon-yanjing_xianshi' : 'icon-yanjing_yincang'
            }`}
            style={{
              color: '#bbbbbb',
              fontSize: '20px',
              marginRight: '0.7rem',
            }}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
        <div className="other" style={{ justifyContent: 'space-between' }}>
          <div
            onClick={() => {
              history.push('/loginEmail');
            }}
          >
            Acceso por correo
          </div>
          {/*onclick="$util.openWindow('message_auth_login_win')"*/}
        </div>
        <div
          className="submit1"
          onClick={handleSubmit}
          style={{ backgroundColor: '#3fa0f9' }}
        >
          Listo
        </div>
        {/*onclick="app.doLogin()"*/}
        <div
          onClick={() => {
            history.push('/register');
          }}
          className="rigster"
          style={{ backgroundColor: '#fff' }}
        >
          Registro
          {/*onclick="$util.openWindow('register_win')"*/}
        </div>
        <div
          onClick={() => {
            history.push('/registerEmail');
          }}
          className="rigster"
          style={{ backgroundColor: '#fff' }}
        >
          Registro Email
        </div>
        {/*onclick="$util.openWindow('register_email_win')"*/}
      </div>
    </div>
  );
}
