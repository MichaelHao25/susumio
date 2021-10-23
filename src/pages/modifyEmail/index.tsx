import Header from '@/component/Header';
import { useEffect, useState } from 'react';
import { postGetParams, postUpdateEmail } from '@/services/api';
import { Notify } from 'notiflix';
import { history } from 'umi';

export default () => {
  const [params, setParams] = useState<{
    wap_login_logo: string;
  }>({
    wap_login_logo: '',
  });
  const [email, setEmail] = useState<string>('');
  useEffect(() => {
    postGetParams().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
  }, []);

  function handleSubmit() {
    var emailtest = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
    if (!emailtest.test(email)) {
      Notify.failure('Por favor,escriba el número correcto');
      return;
    }
    postUpdateEmail({
      email,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        window.localStorage.clear();
        history.push('/');
      }
    });
  }

  return (
    <>
      <Header title={'Modificar Correo electrónico'} />
      <div id="app">
        {/* 中间页 */}
        <div className="aui-content aui-text-center">
          <img
            loading="lazy"
            src={params.wap_login_logo}
            style={{
              width: '65%',
              margin: '2.5rem auto 0 auto',
              marginBottom: '2rem',
            }}
          />
          <div className="area">
            <div className="mix">
              <i className="iconfont icon-xinfeng2" />
              <input
                type="text"
                className="input short"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="submit" onClick={handleSubmit}>
              Cambiar
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
