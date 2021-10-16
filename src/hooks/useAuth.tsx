import { useEffect, useState } from 'react';

export enum LoginStatusQuery {
  Loading,
  isLogin,
  notLogin,
}
export default (): {
  isLogin: LoginStatusQuery;
} => {
  const [isLogin, setIsLogin] = useState<LoginStatusQuery>(
    LoginStatusQuery.Loading,
  );
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(LoginStatusQuery.isLogin);
    } else {
      setIsLogin(LoginStatusQuery.notLogin);
    }
  }, []);
  return {
    isLogin,
  };
};
