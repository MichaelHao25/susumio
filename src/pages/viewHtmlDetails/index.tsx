import { ConnectProps } from 'umi';
import { OrdersListItem } from '@/services/interface';
import Header from '@/component/Header';

interface Props extends ConnectProps<{}, { order: OrdersListItem }, {}> {}

export default (props: Props) => {
  const {
    location: {
      state: { order },
    },
  } = props;
  return (
    <>
      <Header title={order.order_no} />
      <div id="app">
        <div dangerouslySetInnerHTML={{ __html: order.content }}></div>
      </div>
    </>
  );
};
