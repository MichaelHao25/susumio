import Header from '@/component/Header';
import './index.less';
import { history } from 'umi';
import { useState } from 'react';
import { Notify } from 'notiflix';
import {
  postUserAccountsRegister,
  PostUserAccountsRegister,
} from '@/services/api';

export default () => {
  const [mobile, setMobile] = useState<string>('18600899806');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('123456');
  const [checked, setChecked] = useState<boolean>(false);

  function handleSubmit() {
    if (!checked) {
      Notify.failure('Marque la cláusula de servicio');
      return;
    }
    if (!password) {
      Notify.failure('Rellene la contraseña');
      return;
    }
    if (!/^[A-Za-z0-9]{6,20}$/.test(password)) {
      Notify.failure(
        'La combinación de letras y números se limita a 6 a 20 bits',
      );
      return;
    }
    postUserAccountsRegister({
      password,
      mobile,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        window.localStorage.setItem('userinfo', JSON.stringify(res.data));
        window.localStorage.setItem('token', res.data.token.token);
        history.push('/');
      }
    });
  }

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
            loading="lazy"
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
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
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
          <div className="other">
            <p
              onClick={() => {
                history.push('/loginEmail');
              }}
            >
              Login (Email)
            </p>
            <p
              style={{ marginLeft: '5.2rem' }}
              onClick={() => {
                history.push('/login');
              }}
            >
              Login (Cuenta)
            </p>
          </div>
          <div
            className="submit1"
            style={{ backgroundColor: '#3fa0f9' }}
            onClick={handleSubmit}
          >
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
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
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
