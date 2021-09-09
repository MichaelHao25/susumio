interface Props {
  title: string;
}

export default (props: Props) => {
  const { title } = props;
  return (
    <header
      className="aui-bar aui-bar-nav aui-bar-light"
      id="header"
      style={{ backgroundColor: '#ffffff!important' }}
    >
      <a className="aui-pull-left aui-btn">
        <span
          className="aui-iconfont aui-icon-left"
          style={{ color: '#333!important' }}
        />
      </a>
      <div className="aui-title" style={{ color: '#333!important' }} id="title">
        {title}
      </div>
    </header>
  );
};
