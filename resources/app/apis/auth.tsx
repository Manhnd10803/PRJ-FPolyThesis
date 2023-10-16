import instance from './config';

const Login = (data: any) => {
  return instance.post('login', data);
};

const Register = (data: any) => {
  return instance.post('register', data);
};

const SigninWithGoogle = () => {
  fetch('http://localhost:8000/api/google-auth')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong!');
    })
    .then(({ url }) => (window.location.href = url))
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export { Login, Register, SigninWithGoogle };
