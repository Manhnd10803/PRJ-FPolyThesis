import { AuthService } from '@/apis/services/auth.service';
import { load, save } from '@/utilities/local-storage';
import { storageKeys } from '@/utilities/local-storage/storage-keys';
import { TSignInSchema, signInSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register: login,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (dataForm: TSignInSchema) => {
    await AuthService.Login(dataForm);
    reset();
    navigate('/');
  };
  const loginWithGoogle = () => {
    AuthService.LoginWithGoogle();
  };

  const handleChangeStayIn = () => {
    const isStayIn = load(storageKeys.STAY_IN);
    save(storageKeys.STAY_IN, !isStayIn);
  };
  return (
    <>
      <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
        <div className="sign-in-from">
          <h1 className="mb-0">Đăng nhập</h1>
          <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Form.Group className="form-group">
              <Form.Label>Địa chỉ email</Form.Label>
              <Form.Control
                {...login('email')}
                type="text"
                className="mb-0"
                id="exampleInputEmail1"
                placeholder="Ex: abc@gmail.com"
                name="email"
              />
              {errors.email && <p className="text-danger">{`${errors.email.message}`}</p>}
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Mật khẩu</Form.Label>
              <Link to="/get-forgot-password" className="float-end">
                Quên mật khẩu?
              </Link>
              <Form.Control
                {...login('password')}
                type="password"
                className="mb-0"
                id="exampleInputPassword1"
                placeholder="********"
                name="password"
              />
              {errors.password && <p className="text-danger">{`${errors.password.message}`}</p>}
            </Form.Group>
            <div className="d-inline-block w-100">
              <Form.Check className="d-inline-block mt-2 pt-1">
                <Form.Check.Input type="checkbox" className="me-2" id="customCheck11" onChange={handleChangeStayIn} />
                <Form.Check.Label>Lưu sau khi đăng nhập</Form.Check.Label>
              </Form.Check>

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
                Đăng nhập
              </Button>
            </div>
            <Button
              variant="primary"
              style={{ width: '100%' }}
              type="button"
              className="mt-3 d-flex align-items-center justify-content-center gap-1"
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
              Đăng nhập với Google
            </Button>
            <div className="sign-info pt-1">
              <span className="dark-color d-inline-block line-height-2">
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
              </span>
            </div>
          </Form>
        </div>
      </Col>
    </>
  );
};
