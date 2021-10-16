import useAuth, { LoginStatusQuery } from '@/hooks/useAuth';
import { Redirect } from 'umi';
import React, { useEffect } from 'react';
import { Loading } from 'notiflix';

const index: React.FC = (props) => {
  const { isLogin } = useAuth();
  useEffect(() => {
    if (isLogin === LoginStatusQuery.Loading) {
      Loading.dots();
    } else {
      Loading.remove();
    }
  }, [isLogin]);
  if (isLogin === LoginStatusQuery.isLogin) {
    return <div>{props.children}</div>;
  } else if (isLogin === LoginStatusQuery.notLogin) {
    return <Redirect to="/login" />;
  } else {
    return <div>...</div>;
  }
};

export default index;
