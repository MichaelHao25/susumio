import Header from '@/component/Header';
import { postAddressSetDefault } from '@/services/api';
import { ConnectProps, history, Link } from 'umi';
import { Confirm } from 'notiflix';
import List from '@/component/List';
import { AllList } from '@/services/interface';

interface Props extends ConnectProps<{}, { selectAddress?: boolean }, {}> {}

export default (props: Props) => {
  const {
    location: { state: { selectAddress = false } = {} },
  } = props;
  return (
    <div id="app">
      <List
        header={<Header title={'Mi dirección'} />}
        bottom={'2.5rem'}
        params={{ selectAddress }}
        type={AllList.postAddressLists}
      />
      <footer className="aui-bar aui-bar-tab" id="footer">
        <Link
          to={'/addressEdit'}
          className="aui-bar-tab-item aui-padded-l-15 aui-padded-r-15"
        >
          <div className="aui-btn aui-btn-block aui-btn-sm aui-btn-info">
            Nueva dirección
          </div>
        </Link>
      </footer>
    </div>
  );
};
