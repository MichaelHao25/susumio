import Header from '@/component/Header';
import './index.less';
import { ConnectProps } from 'umi';
import { OrderListItemGoodsInfo } from '@/services/interface';
import { useState } from 'react';
import { Notify } from 'notiflix';
import { postOrderCommentsSave } from '@/services/api';
import { history } from '@@/core/umiExports';

interface Props
  extends ConnectProps<
    {},
    {
      goods: OrderListItemGoodsInfo;
    },
    {}
  > {}

export default (props: Props) => {
  const {
    location: {
      state: { goods },
    },
  } = props;

  const [message, setMessage] = useState<string>('');
  const [imgs, setImgs] = useState<string[]>([]);
  const [starLevel, setStarLevel] = useState<number>(0);

  function submit() {
    if (!starLevel) {
      Notify.failure('Seleccione una estrella.');
      return;
    }
    if (!message) {
      Notify.failure('Por favor,introduzca el comentario');
      return;
    }
    let emojiReg =
      /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
    if (emojiReg.test(message)) {
      setMessage(message.replace(emojiReg, ''));
    }
    postOrderCommentsSave({
      order_id: goods.order_id,
      goods_id: goods.goods_id,
      score: starLevel,
      status: 1,
      content: message,
      imgs: imgs,
    }).then((res) => {
      if (res) {
        Notify.success(res.msg);
        history.goBack();
      }
    });
  }

  function fileClick() {
    Notify.failure('error');
  }

  return (
    <div className={'commentAdd'}>
      <Header title={'Comentario'} />
      <div id="app">
        {/* 中间页 */}
        <div className="aui-content">
          <div className="goods">
            <div className="thum">
              <img src={goods.thum} />
            </div>
            <div className="content">
              <textarea
                className="aui-padded-5 aui-border"
                rows={8}
                cols={80}
                placeholder="Cómo está la mercancía? Cómo está el envío? Cuéntanos de la experiencia y puedes compartirlo con todos."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="comment">
            <div className="imgs" id="imgs">
              {imgs.map((img) => {
                return (
                  <img
                    src={img}
                    className="photo"
                    style={{
                      padding: '5px',
                      width: '24%',
                      height: '4.4rem',
                    }}
                  />
                );
              })}
              <img
                src={require('../../assets/img/add_photo.png')}
                onClick={fileClick}
              />
            </div>
            <div className="star">
              <div className="text">Publicar comentarios</div>
              <div className="stars">
                {'.'
                  .repeat(5)
                  .split('')
                  .map((_, index) => {
                    return (
                      <i
                        className="aui-iconfont iconfont icon-shoucang aui-margin-5"
                        style={{
                          fontSize: '1.2rem',
                          color: index + 1 <= starLevel ? '#ffc640' : '#ccc',
                        }}
                        onClick={() => {
                          setStarLevel(index + 1);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="area">
            <div className="submit" onClick={submit}>
              Publicar comentarios
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
