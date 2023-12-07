import { Col, Form, Button, Spinner, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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

  return (
    <Col md="6" className="bg-white pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Sign Up</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <Row>
            <Col md="6">
              <Form.Group className="form-group mb-0">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  {...register('first_name')}
                  type="text"
                  className="mb-0"
                  id="first_name"
                  placeholder="Tên của bạn"
                  disabled={isSubmitting}
                />
                <div className="error-container" style={{ minHeight: '22px' }}>
                  {errors.first_name && <div className="text-danger">{errors.first_name.message}</div>}
                </div>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group mb-0">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  {...register('last_name')}
                  type="text"
                  className="mb-0"
                  id="last_name"
                  placeholder="Họ của bạn"
                  disabled={isSubmitting}
                />
                <div className="error-container" style={{ minHeight: '22px' }}>
                  {errors.last_name && <div className="error-message text-danger">{errors.last_name.message}</div>}
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="form-group mb-0">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register('email')}
              type="email"
              className="mb-0"
              id="email"
              placeholder="Email"
              disabled={isSubmitting}
            />
            <div className="error-container" style={{ minHeight: '24px' }}>
              {errors.email && <p className="text-danger">{`${errors.email.message}`}</p>}
            </div>
          </Form.Group>

          <Form.Group className="form-group mb-0">
            <Form.Label className="form-label" htmlFor="validationDefault041">
              Chuyên ngành
            </Form.Label>
            <Form.Select id="validationDefault041" {...register('major_id')} disabled={isSubmitting}>
              <option value="">Chọn chuyên ngành của bạn</option>
              {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}
            </Form.Select>
            <div className="error-container" style={{ minHeight: '24px' }}>
              {errors.major_id && <p className="text-danger">{`${errors.major_id.message}`}</p>}
            </div>
          </Form.Group>

          <Row>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  {...register('password')}
                  type="password"
                  className="mb-0"
                  id="password"
                  placeholder="Mật khẩu"
                  disabled={isSubmitting}
                />
                <div className="error-container" style={{ minHeight: '44px' }}>
                  {errors.password && <div className="error-message text-danger">{errors.password.message}</div>}
                </div>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="form-group">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  {...register('confirmPassword')}
                  type="password"
                  className="mb-0"
                  id="confirmPassword"
                  placeholder="Xác nhận mật khẩu"
                  disabled={isSubmitting}
                />
                <div className="error-container" style={{ minHeight: '44px' }}>
                  {errors.confirmPassword && (
                    <div className="error-message text-danger">{errors.confirmPassword.message}</div>
                  )}
                </div>
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
          </div>
          <div className="sign-info">
            <span className="dark-color d-inline-block line-height-2">
              Already Have an Account? <Link to={pathName.LOGIN}>Log In</Link>
            </span>
          </div>
        </Form>
      </div>
    </Col>
  );
};
