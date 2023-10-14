// 'use client';

import * as z from 'zod';
import React, { useState } from 'react';
import { Col, Button, Form, Alert } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthFormSchema = z.object({
  email: z.string().min(1, { message: 'Bạn chưa nhập địa chỉ email' }).email({ message: 'Email bạn nhập không đúng' }),
});

type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;

export function AuthFormForgotPassword({ className, ...props }: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthFormValues>({
    resolver: zodResolver(userAuthFormSchema),
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: UserAuthFormValues) => {
    try {
      const response = await fetch('/api/post-forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // setIsLoading(true);

        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 3000);

        setSuccessMessage('Mã xác nhận đã được gửi đến mail của bạn.');
        setErrorMessage(null);
        navigate('/get-verify');
      } else {
        // const errorData = await response.json();
        // setErrorMessage(errorData.message);
        setErrorMessage('Email bạn nhập không đúng !');
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại');
      setSuccessMessage(null);
    }
    // navigate('/api/post-forgot-password');
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Quên mật khẩu</h1>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <p>Nhập Email của bạn và chúng tôi sẽ gửi mã xác nhận email cho bạn trong vài giây tới.</p>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register('email')}
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
            <Button variant="primary" type="submit" className="float-right mt-3">
              Gửi
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  );
}
