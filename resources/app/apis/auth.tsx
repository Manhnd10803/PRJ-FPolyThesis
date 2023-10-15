import instance from './config';

const Login = (data: any) => {
  return instance.post('login', data);
};

const Register = (data: any) => {
  return instance.post('register', data);
};
export { Login, Register };
