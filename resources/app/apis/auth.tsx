import instance from './config';

const Login = (data: any) => {
  return instance.post('login', data);
};
export { Login };
