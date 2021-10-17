import Header from '@/component/Header';
import './index.less';
import { useEffect, useState } from 'react';
import { postGetParams } from '@/services/api';
import { useSelector } from 'umi';
import QRCode from 'qrcode.react';
import { UserinfoState } from '@/pages/login/model';
import { origin } from '@/services/core';

export default () => {
  const [share_img, setShare_img] = useState<string>('');
  const { user } = useSelector(({ userinfo }: { userinfo: UserinfoState }) => {
    return userinfo;
  });
  console.log(user);
  if (!user) {
    throw 'user error';
  }
  useEffect(() => {
    postGetParams().then((res) => {
      if (res) {
        setShare_img(res.data.share_img);
      }
    });
  }, []);
  return (
    <div className={'myqrcode'}>
      <Header title={'Mi código binario'} />
      <div className="aui-content">
        <img
          src={share_img ? share_img : require('../../assets/img/yaoqing.png')}
          style={{ width: '100%' }}
          id="img"
        />
        <QRCode
          value={`${origin}/wap/index/handle_qrcode.html?parent_mobile=${user.mobile}`}
          className={'qrcode'}
        />
      </div>
    </div>
  );
};
