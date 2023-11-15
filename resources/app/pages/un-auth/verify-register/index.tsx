import { Col, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TSVerifyRegisterSchema, verifyRegisterSchema } from '@/validation/zod/auth';
import { AuthService } from '@/apis/services/auth.service';
import toast from 'react-hot-toast';
import { pathName } from '@/routes/path-name';
export const VerifyRegisterPage = () => {
  const location = useLocation();
  const email = location.state && location.state.email;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSVerifyRegisterSchema>({
    resolver: zodResolver(verifyRegisterSchema),
    defaultValues: { email },
  });

  const onSubmit = async (dataForm: TSVerifyRegisterSchema) => {
    try {
      await AuthService.VerifyEmailRegister(dataForm);
      toast.success('Tài khoản được kích hoạt thành công');
      navigate(pathName.LOGIN);
      reset();
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
    <>
      <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
        <div className="sign-in-from">
          <h1 className="mb-0">Enter email verification code</h1>
          <p>Verification code has been sent to your email.</p>
          <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Form.Group>
              <Form.Label>Verification codes</Form.Label>
              <Form.Control
                type="text"
                {...register('verification_code')}
                className="mb-0"
                id="exampleInputCode"
                placeholder="Enter code"
                disabled={isSubmitting}
              />
              {errors.verification_code && (
                <div className="error-message text-danger">{errors.verification_code.message}</div>
              )}
            </Form.Group>
            <div className="d-inline-block w-100">
              <Button variant="primary" type="submit" className="float-right mt-3" disabled={isSubmitting}>
                Send
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </>
  );
};
