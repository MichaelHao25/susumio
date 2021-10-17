import Header from '@/component/Header';
import React, { useEffect, useState } from 'react';
import { Confirm } from 'notiflix';
import { history, useSelector } from 'umi';
import { postGetParams, postQueryPayPassword } from '@/services/api';
import { UserinfoState } from '@/pages/login/model';

export default () => {
  const [params, setParams] = useState<{
    version: string;
  }>({
    version: '0',
  });
  const [isCloseWallet, setIsCloseWallet] = useState<boolean>(true);
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  if (!user) {
    throw 'user error';
  }
  useEffect(() => {
    postGetParams().then((res) => {
      console.log(res);
      if (res) {
        setParams(res.data);
      }
    });
    postQueryPayPassword().then((res) => {
      console.log(res);
      if (res) {
        if (res.data.is_set_pay_password === 1) {
          setIsCloseWallet(true);
        } else {
          setIsCloseWallet(false);
        }
      }
    });
  }, []);
  const logout = () => {
    Confirm.show('warning', '¿Va a salir?', 'Sí', 'No', () => {
      window.localStorage.clear();
      history.push('/');
    });
  };
  return (
    <div>
      <Header title={'Configuración'} />
      <div className="aui-content aui-margin-b-10">
        <ul className="aui-list aui-list-in aui-margin-b-5">
          <li className="aui-list-item" data-click="injectUplpadFile();">
            <div className="aui-list-item-media">
              <img
                src={user.avatar}
                className="aui-img-round aui-list-img-sm"
                id="avatar"
              />
            </div>
            <div
              className="aui-list-item-inner aui-list-item-arrow"
              style={{ width: '100%' }}
            >
              <div
                className="aui-list-item-right aui-text-right"
                style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                Cambiar imagen
              </div>
            </div>
          </li>
          <li className="aui-list-item" data-click="modify('nickname')">
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">Apodo</div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: '0.8rem', color: '#999' }}
              >
                {user.nick_name ? user.nick_name : 'Usuario anónimo'}
              </div>
            </div>
          </li>
          <li className="aui-list-item" data-click="modify('email')">
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">Correo electrónico</div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: '0.8rem', color: '#999' }}
              >
                {user.email}
              </div>
            </div>
          </li>
          <li className="aui-list-item" data-click="modify('mobile')">
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">Número de teléfono</div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: '0.8rem', color: '#999' }}
                v-text="user.mobile"
              />
            </div>
          </li>
          <li className="aui-list-item" data-click="passwordSetting()">
            <div className="aui-list-item-inner aui-list-item-arrow">
              Configuración de contraseñas
            </div>
          </li>
          {isCloseWallet ? (
            <li
              className="aui-list-item"
              data-onclick="$util.openWindow('fingerprint_win')"
            >
              <div className="aui-list-item-inner aui-list-item-arrow">
                Pago de huellas
              </div>
            </li>
          ) : (
            ''
          )}
        </ul>
        <ul className="aui-list aui-list-in aui-margin-b-10">
          <li
            className="aui-list-item"
            data-onclick="$util.openWindow('help_and_option_win')"
          >
            <div className="aui-list-item-inner aui-list-item-arrow">
              <div className="aui-list-item-title">
                Calificar esta aplicación
              </div>
            </div>
          </li>
          <li className="aui-list-item">
            <div className="aui-list-item-inner">
              <div className="aui-list-item-title" style={{ width: '75%' }}>
                Changsha Network abre cientos de millones de páginas web
                Technology Co
              </div>
              <div
                className="aui-list-item-right"
                style={{ fontSize: '0.8rem', color: '#999' }}
              >
                {params.version}
              </div>
            </div>
          </li>
        </ul>
        <div className="area">
          <div
            className="submit"
            onClick={logout}
            style={{ backgroundColor: 'rgb(53, 140, 255)' }}
          >
            Desconectar
          </div>
        </div>
      </div>
    </div>
  );
};
