import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LoginSchema } from '@/validation';
import { Login } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const loginUser = async (formData: { email: string; password: string }) => {
    try {
      const response = await Login(formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate, isLoading, isError, error } = useMutation(loginUser, {
    onSuccess: data => {
      sessionStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = () => {
    LoginSchema.validate(formData, { abortEarly: false })
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
  return (
    <>
      <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
        <div className="sign-in-from">
          <h1 className="mb-0">Sign in</h1>
          <p>Enter your email address and password to access the admin panel.</p>
          <Form className="mt-4">
            <Form.Group className="form-group">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="mb-0"
                id="exampleInputEmail1"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error-message text-danger">{errors.email}</div>}
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Password</Form.Label>
              <Link to="/forgot-password" className="float-end">
                Forgot password?
              </Link>
              <Form.Control
                type="password"
                className="mb-0"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {isError ? (
                <div className="error-message text-danger">{(error as any)?.response?.data?.message}</div>
              ) : (
                errors.password && <div className="error-message text-danger">{errors.password}</div>
              )}
            </Form.Group>
            <div className="d-inline-block w-100">
              <Form.Check className="d-inline-block mt-2 pt-1">
                <Form.Check.Input type="checkbox" className="me-2" id="customCheck11" />
                <Form.Check.Label>Remember Me</Form.Check.Label>{' '}
              </Form.Check>
              <Button variant="primary" type="button" className="float-end" onClick={handleSignIn} disabled={isLoading}>
                {isLoading ? 'Sign in...' : 'Sign in'}
              </Button>
            </div>
            <div className="sign-info">
              <span className="dark-color d-inline-block line-height-2">
                Don't have an account? <Link to="/register">Sign up</Link>
              </span>
              <ul className="iq-social-media">
                <li>
                  <Link to="#">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <title>facebook</title>
                      <path d="M15 16h-14c-0.553 0-1-0.447-1-1v-14c0-0.553 0.447-1 1-1h14c0.553 0 1 0.447 1 1v14c0 0.553-0.447 1-1 1zM14 2h-12v12h12v-12zM8 6c0-1.103 0.912-2 1.857-2h1.143v2h-1v1h1v2h-1v3h-2v-3h-1v-2h1v-1z"></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <title>twitter</title>
                      <path d="M20.833 5.262c-0.186 0.242-0.391 0.475-0.616 0.696-0.233 0.232-0.347 0.567-0.278 0.908 0.037 0.182 0.060 0.404 0.061 0.634 0 5.256-2.429 8.971-5.81 10.898-2.647 1.509-5.938 1.955-9.222 1.12 1.245-0.361 2.46-0.921 3.593-1.69 0.147-0.099 0.273-0.243 0.352-0.421 0.224-0.505-0.003-1.096-0.508-1.32-2.774-1.233-4.13-2.931-4.769-4.593-0.417-1.084-0.546-2.198-0.52-3.227 0.021-0.811 0.138-1.56 0.278-2.182 0.394 0.343 0.803 0.706 1.235 1.038 2.051 1.577 4.624 2.479 7.395 2.407 0.543-0.015 0.976-0.457 0.976-1v-1.011c-0.002-0.179 0.009-0.357 0.034-0.533 0.113-0.806 0.504-1.569 1.162-2.141 0.725-0.631 1.636-0.908 2.526-0.846s1.753 0.463 2.384 1.188c0.252 0.286 0.649 0.416 1.033 0.304 0.231-0.067 0.463-0.143 0.695-0.228zM22.424 2.183c-0.74 0.522-1.523 0.926-2.287 1.205-0.931-0.836-2.091-1.302-3.276-1.385-1.398-0.097-2.836 0.339-3.977 1.332-1.036 0.901-1.652 2.108-1.83 3.372-0.037 0.265-0.055 0.532-0.054 0.8-1.922-0.142-3.693-0.85-5.15-1.97-0.775-0.596-1.462-1.309-2.034-2.116-0.32-0.45-0.944-0.557-1.394-0.237-0.154 0.109-0.267 0.253-0.335 0.409 0 0-0.132 0.299-0.285 0.76-0.112 0.337-0.241 0.775-0.357 1.29-0.163 0.722-0.302 1.602-0.326 2.571-0.031 1.227 0.12 2.612 0.652 3.996 0.683 1.775 1.966 3.478 4.147 4.823-1.569 0.726-3.245 1.039-4.873 0.967-0.552-0.024-1.019 0.403-1.043 0.955-0.017 0.389 0.19 0.736 0.513 0.918 4.905 2.725 10.426 2.678 14.666 0.261 4.040-2.301 6.819-6.7 6.819-12.634-0.001-0.167-0.008-0.33-0.023-0.489 1.006-1.115 1.676-2.429 1.996-3.781 0.127-0.537-0.206-1.076-0.743-1.203-0.29-0.069-0.58-0.003-0.807 0.156z"></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      viewBox="0 0 24 28"
                      fill="currentColor"
                    >
                      <title>instagram</title>
                      <path d="M16 14c0-2.203-1.797-4-4-4s-4 1.797-4 4 1.797 4 4 4 4-1.797 4-4zM18.156 14c0 3.406-2.75 6.156-6.156 6.156s-6.156-2.75-6.156-6.156 2.75-6.156 6.156-6.156 6.156 2.75 6.156 6.156zM19.844 7.594c0 0.797-0.641 1.437-1.437 1.437s-1.437-0.641-1.437-1.437 0.641-1.437 1.437-1.437 1.437 0.641 1.437 1.437zM12 4.156c-1.75 0-5.5-0.141-7.078 0.484-0.547 0.219-0.953 0.484-1.375 0.906s-0.688 0.828-0.906 1.375c-0.625 1.578-0.484 5.328-0.484 7.078s-0.141 5.5 0.484 7.078c0.219 0.547 0.484 0.953 0.906 1.375s0.828 0.688 1.375 0.906c1.578 0.625 5.328 0.484 7.078 0.484s5.5 0.141 7.078-0.484c0.547-0.219 0.953-0.484 1.375-0.906s0.688-0.828 0.906-1.375c0.625-1.578 0.484-5.328 0.484-7.078s0.141-5.5-0.484-7.078c-0.219-0.547-0.484-0.953-0.906-1.375s-0.828-0.688-1.375-0.906c-1.578-0.625-5.328-0.484-7.078-0.484zM24 14c0 1.656 0.016 3.297-0.078 4.953-0.094 1.922-0.531 3.625-1.937 5.031s-3.109 1.844-5.031 1.937c-1.656 0.094-3.297 0.078-4.953 0.078s-3.297 0.016-4.953-0.078c-1.922-0.094-3.625-0.531-5.031-1.937s-1.844-3.109-1.937-5.031c-0.094-1.656-0.078-3.297-0.078-4.953s-0.016-3.297 0.078-4.953c0.094-1.922 0.531-3.625 1.937-5.031s3.109-1.844 5.031-1.937c1.656-0.094 3.297-0.078 4.953-0.078s3.297-0.016 4.953 0.078c1.922 0.094 3.625 0.531 5.031 1.937s1.844 3.109 1.937 5.031c0.094 1.656 0.078 3.297 0.078 4.953z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </Form>
        </div>
      </Col>
    </>
  );
};
