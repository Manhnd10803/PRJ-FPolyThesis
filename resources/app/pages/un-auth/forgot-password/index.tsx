import { Button, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthService } from '@/apis/services/auth.service';
import { TforgotPasswordSchema, forgotPasswordSchema } from '@/validation/zod/auth';
import { pathName } from '@/routes/path-name';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    register: forgotPassword,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (dataForm: TforgotPasswordSchema) => {
    try {
      const { data } = await AuthService.ForgotPassword(dataForm);
      reset();
      navigate(pathName.RESET_PASSWORD);
    } catch (error: any) {
      if (error) {
        const serverError = error.message;
        setError('email', {
          type: 'server',
          message: serverError,
        });
      }
    }
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Quên mật khẩu </h1>
        <p>Nhập Email của bạn và chúng tôi sẽ gửi mã xác nhận email cho bạn trong vài giây tới.</p>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...forgotPassword('email')}
              name="email"
              type="email"
              className="mb-0"
              id="exampleInputEmail1"
              placeholder="Nhập địa chỉ email của bạn ..."
              isInvalid={!!errors.email}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </Form.Group>
          <div className="d-inline-block w-100">
            <Button disabled={isSubmitting} variant="primary" type="submit" className="float-right mt-3">
              Nhận mã xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  );
};
