// 'use client';

import * as z from 'zod';
import React, { useState } from 'react';
import { Row, Col, Button, Form, Alert, Container, Image } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Route, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthFormSchema = z.object({
  verification_code: z
    .string()
    .min(1, { message: 'Mã xác nhận là bắt buộc' })
    .refine(value => /^\d{5}$/.test(value), {
      message: 'Mã xác nhận phải là 5 số !',
      path: ['text'],
    }),
  password: z.string().min(1, { message: 'Mật khẩu mới là bắt buộc' }),
});

type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;

export function AuthFormGetVerify({ className, ...props }: UserAuthFormProps) {
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
    // setIsLoading(true);

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);

    try {
      const response = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage('Tạo mật khẩu mới thành công !');
        setErrorMessage(null);
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại');
      setSuccessMessage(null);
    }
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Nhập mã xác nhận</h1>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <p>Nhập mã xác nhận chúng tôi đã gửi trong email của bạn. Có thể nằm trong SPAM nhé.</p>
        <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Mã xác nhận</Form.Label>
            <Form.Control
              {...register('verification_code')}
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
              {...register('password')}
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
            <Button variant="primary" type="submit" className="float-right mt-3">
              Gửi
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  );
}
