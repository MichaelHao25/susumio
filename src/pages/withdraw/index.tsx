import Header from '@/component/Header';
import { useState } from 'react';
import Notiflix, { Notify } from 'notiflix';
import {
  postPayMoney,
  postQueryPayPassword,
  postWithdraw,
} from '@/services/api';
import { history } from 'umi';

export default () => {
  const [money, setMoney] = useState<string>('');
  const handleSubmit = () => {
    if (money) {
      Notify.failure('Por favor,introduzca la cantidad correcta de efectivo');
      return;
    }
    postQueryPayPassword().then((res) => {
      if (res.data.is_set_pay_password === 0) {
        Notify.failure('Establezca la contraseña de pago');
        // todo 需要修改密码等
        // history.push('/initPayPassword')
        return;
      }

      Notiflix.Confirm.merge({
        plainText: false,
      });
      Notiflix.Confirm.show(
        'Introduzca el Código de transacción.',
        `<input type="password" class="confirm_password"/>`,
        'Confirmar',
        'Cancelar',
        function () {
          const input: HTMLInputElement | null =
            document.querySelector('.confirm_password');
          if (input) {
            const value = input.value;
            if (value !== '') {
              postWithdraw({
                asset_type: 'money',
                bank_card_id: 0,
                money: money,
                pay_password: value,
                type: 'withdrawToBankCard',
              }).then((res) => {
                if (res) {
                  Notify.success(res.msg);
                  history.goBack();
                }
              });
            }
          }
        },
        function () {},
      );
    });
  };
  return (
    <div>
      <Header title={'Sacar dinero'} />
      <div className="aui-content">
        <ul
          className="aui-list aui-list aui-media-list aui-bg-default"
          style={{ backgroundImage: 'none' }}
        >
          {/* 提现金额 */}
          <li
            className="aui-list-item aui-margin-t-10 aui-bg-white"
            style={{ backgroundImage: 'none' }}
          >
            <div className="aui-list-item-inner">
              <div className="aui-list-item-label">Importe</div>
            </div>
          </li>
          <li
            className="aui-list-item aui-padded-b-15 aui-bg-white"
            style={{ backgroundImage: 'none' }}
          >
            <span>$</span>
            <div className="aui-list-item-input">
              <div className="aui-list-item-input aui-padded-b-10 aui-border-b">
                <input
                  className="aui-text-center"
                  type="number"
                  pattern="[0-9]*"
                  style={{ fontSize: '1.8rem', letterSpacing: '.2rem' }}
                  value={money}
                  onChange={(e) => {
                    setMoney(e.target.value);
                  }}
                />
              </div>
            </div>
          </li>
          {/* <span class="aui-padded-l-15 aui-font-size-12">余额:334</span> */}
        </ul>
        <div className="area">
          <div className="submit" onClick={handleSubmit} id="submit">
            Presentación
          </div>
        </div>
      </div>
    </div>
  );
};
