import Header from '@/component/Header';
import { useState } from 'react';
import { history, useSelector } from 'umi';
import { UserinfoState } from '@/pages/login/model';
import { postSetPayPasswordFirst } from '@/services/api';
import { Notify } from 'notiflix';

enum TypeValue {
  password,
  text,
}

export default () => {
  const [typeValue, setTypeValue] = useState<TypeValue>(TypeValue.password);
  const [password, setPassword] = useState<string>('');
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  const submit = () => {
    postSetPayPasswordFirst({
      mobile: user.mobile,
      pay_password: password,
      pay_password_confirm: password,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        history.push('/my');
      }
    });
  };
  return (
    <>
      <Header title={'Abrir cartera'} />
      <div id="app" style={{ height: '26rem', backgroundColor: '#fff' }}>
        <div className="area aui-text-center">
          <div
            className="open-wallet"
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '0.025rem solid #eee',
            }}
          >
            <input
              type={typeValue === TypeValue.text ? 'text' : 'password'}
              className="input"
              placeholder="Establezca la contraseña de pago"
              onChange={(e) => {
                setPassword(e.target.value.replace(/[^\d]/g, ''));
              }}
              value={password}
              style={{ marginLeft: '1.2rem' }}
            />
            <i
              className={`iconfont ${
                typeValue === TypeValue.text
                  ? 'icon-yanjing_yincang'
                  : 'icon-yanjing_xianshi'
              }`}
              style={{
                color: '#bbbbbb',
                fontSize: '20px',
                marginRight: '1rem',
              }}
              onClick={() => {
                setTypeValue((a) => {
                  if (a === TypeValue.password) {
                    return TypeValue.text;
                  } else {
                    return TypeValue.password;
                  }
                });
              }}
            />
          </div>
          <div
            className="submit1"
            onClick={submit}
            style={{ backgroundColor: '#3fa0f9', marginTop: '2rem' }}
          >
            Abrir
          </div>
        </div>
      </div>
    </>
  );
};
