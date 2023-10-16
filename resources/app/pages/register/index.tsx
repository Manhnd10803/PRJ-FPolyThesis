import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Register, SigninWithGoogle } from '@/apis/auth';
import { RegisterSchema } from '@/validation';

interface UserData {
  username: string;
  email: string;
  password: string;
}

function RegisterPage() {
  const [formData, setFormData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { mutate, isLoading } = useMutation((formData: UserData) => {
    return Register(formData);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    RegisterSchema.validate(formData, { abortEarly: false })
      .then(() => {
        mutate(formData);
      })
      .catch((err: any) => {
        if (err.inner) {
          const validationErrors: { [key: string]: string } = {};
          err.inner.forEach((error: any) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
        }
      });
  };
  const loginWithGoogle = () => {
    SigninWithGoogle();
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Sign Up</h1>
        <p>Enter your email address and password to access the admin panel.</p>
        <Form className="mt-4">
          <Form.Group className="form-group">
            <Form.Label>Your Full Name</Form.Label>
            <Form.Control
              type="text"
              className="mb-0"
              id="username"
              placeholder="Your Full Name"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="error-message text-danger">{errors.username}</div>}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              className="mb-0"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error-message text-danger">{errors.email}</div>}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="mb-0"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error-message text-danger">{errors.password}</div>}
          </Form.Group>
          <div className="d-inline-block w-100">
            {/* <Form.Check className="d-inline-block mt-2 pt-1">
              <Form.Check.Input type="checkbox" className="me-2" id="customCheck1" />
              <Form.Check.Label>
                I accept <Link to="#">Terms and Conditions</Link>
              </Form.Check.Label>
            </Form.Check> */}
            <Button type="submit" className="btn-primary w-100 mb-3" onClick={handleRegister} disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
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
            {/* <ul className="iq-social-media">
              <li>
                <Link to="#">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512" fill="currentColor">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </Link>
              </li>
            </ul> */}
          </div>
        </Form>
      </div>
    </Col>
  );
}

export default RegisterPage;
