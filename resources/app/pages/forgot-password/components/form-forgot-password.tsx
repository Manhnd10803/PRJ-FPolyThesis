// 'use client';

import * as z from 'zod';
import React from 'react';
import { Row, Col, Button, Form, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthFormSchema = z.object({
  email: z.string().min(1, { message: 'Email address is required' }).email({ message: 'Email address is not correct' }),
});

type UserAuthFormValues = z.infer<typeof userAuthFormSchema>;

export function AuthFormForgotPassword({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthFormValues>({
    resolver: zodResolver(userAuthFormSchema),
  });

  const onSubmit = (data: UserAuthFormValues) => {
    // Xử lý logic khi submit biểu mẫu
  };

  return (
    <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
      <div className="sign-in-from">
        <h1 className="mb-0">Quên mật khẩu</h1>
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
            {errors.email && <span>{errors.email.message}</span>}
          </Form.Group>
          <div className="d-inline-block w-100">
            <Button variant="primary" type="submit" className="float-right mt-3">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  );
}
