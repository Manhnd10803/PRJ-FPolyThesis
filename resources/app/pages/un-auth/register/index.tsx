import { Col, Form, Button, Spinner, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import { RegisterSchema } from '@/validation';
import { AuthService } from '@/apis/services/auth.service';
import { TSignUpSchema, signUpSchema } from '@/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';
import { IMajors } from '@/models/major';
import { pathName } from '@/routes/path-name';

export const RegisterPage = () => {
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
      navigate(pathName.VERIFY_REGISTER, { state: { email: data.email } });
      reset();
    } catch (error: any) {
      if (error) {
        const emailError = error.errors.email; // Adjust this according to your API response structure
        if (emailError) {
          setError('email', {
            type: 'server',
            message: emailError,
          });
        }
      }
    }
  };
  const { data } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getListMajorsRegister(),
  });
  const majors = data?.data;
  const loginWithGoogle = () => {
    AuthService.LoginWithGoogle();
  };

  return (
    <Col md="6" className="bg-white pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Sign Up</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Row>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  {...register('first_name')}
                  type="text"
                  className="mb-0"
                  id="first_name"
                  placeholder="Your First name"
                  disabled={isSubmitting}
                />
                {errors.first_name && <div className="error-message text-danger">{errors.first_name.message}</div>}
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  {...register('last_name')}
                  type="text"
                  className="mb-0"
                  id="last_name"
                  placeholder="Your Last name"
                  disabled={isSubmitting}
                />
                {errors.last_name && <div className="error-message text-danger">{errors.last_name.message}</div>}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register('email')}
              type="email"
              className="mb-0"
              id="email"
              placeholder="Enter email"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-danger">{`${errors.email.message}`}</p>}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label className="form-label" htmlFor="validationDefault041">
              Chuyên ngành
            </Form.Label>
            <Form.Select id="validationDefault041" {...register('major_id')}>
              <option value="">Chọn chuyên ngành của bạn</option>
              {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}
            </Form.Select>
            {errors.major_id && <p className="text-danger">{`${errors.major_id.message}`}</p>}
          </Form.Group>

          <Row>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register('password')}
                  type="password"
                  className="mb-0"
                  id="password"
                  placeholder="Password"
                  disabled={isSubmitting}
                />
                {errors.password && <div className="error-message text-danger">{errors.password.message}</div>}
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  {...register('confirmPassword')}
                  type="password"
                  className="mb-0"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && (
                  <div className="error-message text-danger">{errors.confirmPassword.message}</div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <div className="d-inline-block w-100">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="disabled:bg-gray-500 d-flex align-items-center justify-content-center gap-1"
              variant="primary"
              style={{ width: '100%' }}
            >
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                </>
              ) : (
                ''
              )}
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
};
