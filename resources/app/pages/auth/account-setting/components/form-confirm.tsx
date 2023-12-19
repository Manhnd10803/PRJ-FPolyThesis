import { AuthService } from '@/apis/services/auth.service';
import { TconfirmPasswordSchema, confirmPasswordSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export const ConfirmForm = ({ onContinue }) => {
  const {
    register: confirm,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TconfirmPasswordSchema>({
    resolver: zodResolver(confirmPasswordSchema),
  });

  const onSubmit = async (dataForm: TconfirmPasswordSchema) => {
    try {
      await AuthService.ConfirmPassword(dataForm);
      toast.success('Thông tin bạn nhập chính xác');
      onContinue();
    } catch (error: any) {
      reset();
      toast.error('Thông tin bạn nhập không chính xác');
      if (error) {
        const emailError = error.errors.email;
        if (emailError) {
          setError('email', {
            type: 'server',
            message: emailError,
          });
        }
        const passwordError = error.errors.password;
        if (passwordError) {
          setError('password', {
            type: 'server',
            message: passwordError,
          });
        }
      }
    }
  };

  // const handleContinueClick = () => {
  //   // Gọi hàm onContinue để chuyển sang trạng thái reset form
  //   onContinue();
  // };

  return (
    <>
      <Form id="form-wizard3" className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className="form-card text-left">
            <Row>
              <div className="col-12">
                <h3 className="mb-4">Đổi mật khẩu</h3>
              </div>
            </Row>
            <Row>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label>Email của bạn: *</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Nhập email đăng ký tài khoản của bạn ... "
                    // isInvalid={!!errors.email}
                    {...confirm('email')}
                  />
                  {errors.email && <div className="error-message text-danger">{errors.email.message}</div>}
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label>Mật khẩu cũ : *</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    {...confirm('password')}
                    placeholder="Nhập mật khẩu cũ ... "
                  />
                  {errors.password && <div className="error-message text-danger">{errors.password.message}</div>}
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label>Xác nhận mật khẩu cũ : *</Form.Label>
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    {...confirm('confirmPassword')}
                    // isInvalid={!!errors.confirmPassword}
                    placeholder="Xác nhận mật khẩu cũ ... "
                  />
                  {errors.confirmPassword && (
                    <div className="error-message text-danger">{errors.confirmPassword.message}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </div>
          <Button
            type="submit"
            id="submit"
            name="next"
            className="btn-primary next float-end"
            value="Next"
            disabled={isSubmitting}
            // onClick={handleContinueClick}
          >
            Tiếp tục
          </Button>
        </fieldset>
      </Form>
    </>
  );
};
