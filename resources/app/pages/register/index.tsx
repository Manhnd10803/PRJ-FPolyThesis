import { Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import { RegisterSchema } from '@/validation';
import { AuthService } from '@/apis/services/auth.service';
import { TSignUpSchema, signUpSchema } from '@/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (dataForm: TSignUpSchema) => {
    try {
      const { data } = await AuthService.Register(dataForm);
      console.log(data);
      reset();
      // navigate('/login');
    } catch (error: any) {
      if (error) {
        const serverError = error.errors.email;
        setError('email', {
          type: 'server',
          message: serverError,
        });
      }
    }
  };
  const loginWithGoogle = () => {
    AuthService.LoginWithGoogle();
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Sign Up</h1>
        <p>Enter your email address and password to access the admin panel.</p>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Form.Group className="form-group">
            <Form.Label>Your Full Name</Form.Label>
            <Form.Control
              {...register('username')}
              type="text"
              className="mb-0"
              id="username"
              placeholder="Your Full Name"
            />
            {errors.username && <div className="error-message text-danger">{errors.username.message}</div>}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Email address</Form.Label>
            <Form.Control {...register('email')} type="email" className="mb-0" id="email" placeholder="Enter email" />
            {errors.email && <p className="text-danger">{`${errors.email.message}`}</p>}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register('password')}
              type="password"
              className="mb-0"
              id="password"
              placeholder="Password"
            />
            {errors.password && <div className="error-message text-danger">{errors.password.message}</div>}
          </Form.Group>
          <div className="d-inline-block w-100">
            <Button type="submit" className="btn-primary w-100 mb-3" disabled={isSubmitting}>
              Sign up
            </Button>

            <Button
              variant="primary"
              style={{ width: '100%' }}
              type="button"
              className="mt-2 d-flex align-items-center justify-content-center gap-1"
              onClick={loginWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>{' '}
              Login with Google
            </Button>
          </div>
          <div className="sign-info">
            <span className="dark-color d-inline-block line-height-2">
              Already Have an Account? <Link to="/login">Log In</Link>
            </span>
          </div>
        </Form>
      </div>
    </Col>
  );
}

export default RegisterPage;
