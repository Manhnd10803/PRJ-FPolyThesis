import { AuthService } from '@/apis/services/auth.service';
import { pathName } from '@/routes/path-name';
import { load, save } from '@/utilities/local-storage';
import { storageKeys } from '@/utilities/local-storage/storage-keys';
import { TSignInSchema, signInSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface DecodedToken {
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
}

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
    const data = await AuthService.Login(dataForm);
    if (data.access_token) {
      reset();
      navigate(pathName.HOME);
    }
  };

  const handleChangeStayIn = () => {
    const isStayIn = load(storageKeys.STAY_IN);
    save(storageKeys.STAY_IN, !isStayIn);
  };

  const handleGoogleLoginSuccess = async ({ credential }: CredentialResponse) => {
    if (credential) {
      const dataLogin: DecodedToken = jwtDecode(credential);
      const dataForm: FormData = {
        email: dataLogin.email,
        first_name: dataLogin.family_name,
        last_name: dataLogin.given_name,
        avatar: dataLogin.picture,
      };
      const data = await AuthService.LoginWithGoogle(dataForm);
      if (data.access_token) {
        navigate(pathName.HOME);
      }
    }
  };

  return (
    <>
      <Col md="6" className="bg-white pt-5 pb-lg-0 pb-5">
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
              <Link to={pathName.FORGOT_PASSWORD} className="float-end">
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
              <Form.Check className="d-inline-block mb-3">
                <Form.Check.Input
                  type="checkbox"
                  className="me-2"
                  id="customCheck11"
                  defaultChecked
                  onChange={handleChangeStayIn}
                />
                <Form.Check.Label>Lưu sau khi đăng nhập</Form.Check.Label>
              </Form.Check>

              <Button
                disabled={isSubmitting}
                type="submit"
                className="disabled:bg-gray-500 d-flex align-items-center justify-content-center gap-1 mb-2"
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
                Đăng nhập với email
              </Button>
            </div>
            <hr />
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  toast.error('Đăng nhập thất bại');
                }}
                locale="vi_VN"
                useOneTap
              />
            </GoogleOAuthProvider>
            <div className="sign-info pt-1">
              <span className="dark-color d-inline-block line-height-2">
                Bạn chưa có tài khoản? <Link to={pathName.REGISTER}>Đăng ký</Link>
              </span>
            </div>
          </Form>
        </div>
      </Col>
    </>
  );
};
