import Header from '@/component/Header';
import { ConnectProps, history, useSelector } from 'umi';
import { useEffect, useState } from 'react';
import {
  postGetParams,
  PostUpdatePassword,
  postUpdatePassword,
} from '@/services/api';
import { UserinfoState } from '@/pages/login/model';
import Notiflix, { Notify } from 'notiflix';

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
  const [mobile, setMobile] = useState<string>(() => {
    if (user.mobile) {
      return user.mobile;
    } else {
      return '';
    }
  });
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    postGetParams().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
  }, []);

  function handleSubmit() {
    if (!/^1\d{10}$/.test(mobile)) {
      Notify.failure('Por favor,escriba el número correcto');
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

    const req: PostUpdatePassword = {
      type,
      mobile,
    };
    if (type == 1) {
      req.password = password;
      req.password_confirm = password;
    } else if (type == 2) {
      req.pay_password = password;
      req.pay_password_confirm = password;
    }
    postUpdatePassword(req).then((res) => {
      if (res) {
        Notify.success(res.msg);
        window.localStorage.clear();
        history.push('/login');
      }
    });
  }

  return (
    <div>
      <Header
        title={type === 1 ? 'Cambiar contraseña' : 'Restablecer la contraseña'}
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
              className="iconfont icon-shouji"
              style={{ color: '#3fa0f9', fontSize: '20px' }}
            />
            <input
              type="number"
              className="input"
              pattern="[0-9]*"
              placeholder="Número de teléfono"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              value={mobile}
              disabled={user.mobile !== ''}
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              pattern="[0-9]*"
              placeholder="Nueva contrasña"
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
