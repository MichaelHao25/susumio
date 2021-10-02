import { ConnectProps } from '@@/plugin-dva/connect';
import Header from '@/component/Header';

interface Props
  extends ConnectProps<
    {},
    {
      paylink: string;
      pm_id: string;
    },
    {}
  > {}

export default (props: Props) => {
  const {
    location: {
      state: { paylink, pm_id },
    },
  } = props;
  return (
    <>
      <Header title={pm_id} />
      <iframe
        src={paylink}
        frameBorder="0"
        style={{ width: '100%', height: 'calc(100vh - 2.25rem)' }}
      />
    </>
  );
};
