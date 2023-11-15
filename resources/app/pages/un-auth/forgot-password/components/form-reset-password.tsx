import { Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AuthService } from '@/apis/services/auth.service';
import { type } from 'os';
import { TresetPasswordSchema, resetPasswordSchema } from '@/validation/zod/auth';
import toast from 'react-hot-toast';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const {
    register: resetPassword,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TresetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (dataForm: TresetPasswordSchema) => {
    try {
      const { data } = await AuthService.ResetPassword(dataForm);
      reset();
      toast.success('Đổi mật khẩu thành công');
      navigate('/login');
    } catch (error: any) {
      if (error) {
        const serverError = error.message;
        setError('verification_code', {
          type: 'server',
          message: serverError,
        });
      }
    }
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Nhập mã xác nhận</h1>
        <p>Nhập mã xác nhận chúng tôi đã gửi trong email của bạn. Có thể nằm trong SPAM nhé.</p>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Mã xác nhận</Form.Label>
            <Form.Control
              {...resetPassword('verification_code')}
              name="verification_code"
              type="text"
              className="mb-0"
              id="exampleInputEmail1"
              placeholder="Nhập mã xác nhận của bạn ..."
              isInvalid={!!errors.verification_code}
            />
            {errors.verification_code && <span style={{ color: 'red' }}>{errors.verification_code.message}</span>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
              {...resetPassword('password')}
              name="password"
              type="password"
              className="mb-0"
              id="exampleInputEmail1"
              placeholder="Nhập mã mật khẩu mới của bạn ..."
              isInvalid={!!errors.password}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </Form.Group>

          <div className="d-inline-block w-100">
            <Button disabled={isSubmitting} variant="primary" type="submit" className="float-right mt-3">
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  );
};
