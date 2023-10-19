import React from 'react';
import { Row, Col, Button, Form, Container, Image } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
const images = 'https://picsum.photos/20';
import { AuthFormForgotPassword } from './components/form-forgot-password';
import { AuthFormGetVerify } from './components/form-get-vetify';

export const ForgotPasswordPage = () => {
  const location = useLocation();
  return (
    <>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>

        <Container className="p-0">
          {/* Left */}
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={images} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0"
                  >
                    <SwiperSlide>
                      <Image src={images} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Cùng nhau chia sẻ kiến thức</h4>
                      <p>Kho tài liệu hay, mới mẻ và chất lượng dành cho sinh viên mọi ngành nghề.</p>
                    </SwiperSlide>

                    {/* 
                    <SwiperSlide>
                      <Image src={images} className="img-fluid mb-4" alt="logo"/> 
                      <h4 className="mb-1 text-white">Connect with the world</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <Image src={images} className="img-fluid mb-4" alt="logo"/>
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                     */}
                  </Swiper>
                </div>
              </div>
            </Col>

            {/* Right */}
            {location.pathname === 'get-forgot-password' ? (
              <AuthFormForgotPassword />
            ) : location.pathname === 'get-verify' ? (
              <AuthFormGetVerify />
            ) : null}
            {/* <AuthFormForgotPassword /> */}
          </Row>
        </Container>
      </section>
    </>
  );
};
