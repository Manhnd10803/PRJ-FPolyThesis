import { AuthService } from '@/apis/services/auth.service';
import { pathName } from '@/routes/path-name';
import {
  TresetNewPasswordSchema,
  TresetPasswordSchema,
  resetNewPasswordSchema,
  resetPasswordSchema,
} from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/50';

export const ResetForm = () => {
  const navigate = useNavigate();
  const {
    register: resetPassword,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TresetNewPasswordSchema>({
    resolver: zodResolver(resetNewPasswordSchema),
  });

  const onSubmit = async (dataForm: TresetNewPasswordSchema) => {
    try {
      const { data } = await AuthService.ResetNewPassword(dataForm);
      reset();
      toast.success('Đổi mật khẩu thành công');
      navigate(pathName.HOME);
    } catch (error: any) {
      reset();
      toast.error('Thông tin bạn nhập không chính xác');

      if (error) {
        const codeError = error.message;
        setError('verification_code', {
          type: 'server',
          message: codeError,
        });
        const passwordError = error.message;
        setError('password', {
          type: 'server',
          message: passwordError,
        });
      }
    }
  };

  return (
    <>
      <Form id="form-wizard3" onSubmit={handleSubmit(onSubmit)} className="text-start">
        <fieldset>
          <div className="form-card text-left">
            <Row>
              <div className="col-12">
                <h3 className="mb-4">Xác nhận đổi mật khẩu</h3>
              </div>
            </Row>
            <Row>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label>Nhập mã xác nhận: *</Form.Label>
                  <Form.Control
                    type="text"
                    id="verification_code"
                    {...resetPassword('verification_code')}
                    placeholder="Mã xác nhận đã được gửi vào email của bạn ..."
                  />
                  {errors.verification_code && <span style={{ color: 'red' }}>{errors.verification_code.message}</span>}
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label>Mật khẩu mới : *</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    {...resetPassword('password')}
                    placeholder="Nhập mật khẩu mới"
                  />
                  {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group className="form-group">
                  <Form.Label>Xác nhận mật khẩu mới : *</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    {...resetPassword('confirmPassword')}
                    placeholder="Xác nhận lại mật khẩu mới"
                  />
                  {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
                </Form.Group>
              </Col>
            </Row>
          </div>
          <Button type="submit" id="submit" disabled={isSubmitting} className="btn-primary next float-end" value="Next">
            Xác nhận đổi mật khẩu
          </Button>
        </fieldset>
      </Form>
    </>
  );
};
