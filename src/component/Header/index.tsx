import { history } from 'umi';
import { ReactNode } from 'react';

interface Props {
  title: string;
  noBack?: boolean;
  right?: ReactNode;
  left?: string;
}

export default (props: Props) => {
  const { title, noBack, right, left = '' } = props;
  return (
    <header
      className="aui-bar aui-bar-nav aui-bar-light"
      id="header"
      style={{ backgroundColor: '#ffffff!important' }}
    >
      {noBack ? (
        <></>
      ) : (
        <a
          onClick={() => {
            history.goBack();
          }}
          className="aui-pull-left aui-btn"
        >
          <span
            className="aui-iconfont aui-icon-left"
            style={{ color: '#333!important' }}
          >
            {left ? left : ''}
          </span>
        </a>
      )}

      <div className="aui-title" style={{ color: '#333!important' }} id="title">
        {title}
      </div>
      {right}
    </header>
  );
};
