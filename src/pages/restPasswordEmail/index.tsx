import Header from '@/component/Header';
import { ConnectProps, history, useSelector } from 'umi';
import { useEffect, useState } from 'react';
import {
  postGetParams,
  postSendEmailCode,
  PostUpdatePassword,
  postUpdatePassword,
  PostUpdatePasswordByEmail,
  postUpdatePasswordByEmail,
} from '@/services/api';
import { UserinfoState } from '@/pages/login/model';
import Notiflix, { Notify } from 'notiflix';
import './index.less';

interface Props extends ConnectProps<{}, { type: number }, {}> {}

export default (props: Props) => {
  console.log(props);
  const {
    location: {
      state: { type },
    },
  } = props;
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const [params, setParams] = useState<{
    wap_login_logo: string;
  }>({
    wap_login_logo: '',
  });
  const [email, setEmail] = useState<string>(() => {
    if (user.email) {
      return user.email;
    } else {
      return '';
    }
  });
  const [password, setPassword] = useState<string>('');
  const [varicode, setVaricode] = useState<string>('');
  const [time, setTime] = useState<number>(90);
  const [message, setMessage] = useState<string>('Envía código verificación');
  const [typeValue, setTypeValue] = useState<string>('password');
  useEffect(() => {
    postGetParams().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (time === 0) {
      setMessage('Enviar Código de autenticación');
      setTime(90);
    }
    if (time !== 90) {
      setMessage('Enviado' + time);
      setTimeout(() => {
        setTime((e) => --e);
      }, 1000);
    }
  }, [time]);

  function handleSubmit() {
    var emailtest = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    if (!emailtest.test(email)) {
      Notify.failure('Por favor,escriba el número correcto');
      return;
    }
    if (varicode == '') {
      Notify.failure('Por favor rellene el Código');
      return;
    }
    if (password == '') {
      Notify.failure('Rellene la contraseña');
      return;
    }
    if (!/^[A-Za-z0-9]{6,20}$/.test(password)) {
      Notify.failure(
        'La combinación de letras y números se limita a 6 a 20 bits',
      );
      return;
    }

    const req: PostUpdatePasswordByEmail = {
      type,
      email,
      code: varicode,
    };
    if (type == 2) {
      req.password = password;
    } else if (type == 4) {
      req.pay_password = password;
    }
    postUpdatePasswordByEmail(req).then((res) => {
      if (res) {
        Notify.success(res.msg);
        window.localStorage.clear();
        history.push('/login');
      }
    });
  }

  function sendVaricode() {
    var emailtest = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    if (!emailtest.test(email)) {
      Notify.failure('Por favor,escriba el número correcto');
      return;
    }
    if (time === 90) {
      postSendEmailCode({
        type: 2,
        email,
      }).then((res) => {
        if (res) {
          Notify.success(res.msg);
          setTime((e) => --e);
        }
      });
    }
  }

  return (
    <div>
      <Header
        title={
          type == 3
            ? 'Cambiar contraseña de acceso'
            : 'Cambiar contraseña de pago'
        }
      />

      <div id="app" style={{ height: '26rem', backgroundColor: '#fff' }}>
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
            <img src={params.wap_login_logo} style={{ width: '60%' }} />
          </div>
          <div className="mix">
            <i
              className="iconfont icon-xinfeng2"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type="email"
              className="input"
              placeholder="Correo electrónico"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              disabled={user.email !== ''}
            />
          </div>
          <div className="mix">
            <i
              className="iconfont icon-mima"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type="number"
              className="input"
              value={varicode}
              onChange={(e) => {
                setVaricode(e.target.value);
              }}
              pattern="[0-9]*"
              placeholder="Código verificación"
            />
            <div
              id="get-varicode"
              className={`${time !== 90 ? 'b-disabled' : ''}`}
              onClick={sendVaricode}
            >
              {message}
            </div>
          </div>
          <div className="mix">
            <i
              className="iconfont icon-mima"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type={typeValue}
              className="input"
              value={password}
              placeholder="Nueva contraseña"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <i
              className={`iconfont ${
                typeValue === 'password'
                  ? 'icon-yanjing_xianshi'
                  : 'icon-yanjing_yincang'
              }`}
              style={{
                color: '#bbbbbb',
                fontSize: '20px',
                marginRight: '0.7rem',
              }}
              onClick={() =>
                setTypeValue((e) => {
                  if (e === 'password') {
                    return 'text';
                  } else {
                    return 'password';
                  }
                })
              }
            />
          </div>
          <div
            className="submit1"
            onClick={handleSubmit}
            style={{ backgroundColor: '#3fa0f9' }}
          >
            Listo
          </div>
        </div>
      </div>
    </div>
  );
};
