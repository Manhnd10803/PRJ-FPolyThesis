import React from 'react';
import { Row, Col, Button, Form, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import images from '@/assets/images';
import { AuthFormForgotPassword } from './components/form-forgot-password';

export const ForgotPasswordPage = () => {
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
                  <Image src={images.logo} className="img-fluid" alt="logo" />
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
                      <Image src={images.slide1} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Cùng nhau chia sẻ kiến thức</h4>
                      <p>Kho tài liệu hay, mới mẻ và chất lượng dành cho sinh viên mọi ngành nghề.</p>
                    </SwiperSlide>

                    {/* 
                    <SwiperSlide>
                      <Image src={images.slide2} className="img-fluid mb-4" alt="logo"/> 
                      <h4 className="mb-1 text-white">Connect with the world</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>

                    <SwiperSlide>
                      <Image src={images.slide3} className="img-fluid mb-4" alt="logo"/>
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                     */}
                  </Swiper>
                </div>
              </div>
            </Col>

            {/* Right */}
            <AuthFormForgotPassword />
          </Row>
        </Container>
      </section>
    </>
  );

  // return (
  //   <>
  //     <div
  //       className="lg:p-8"
  //       style={{
  //         padding: '2rem',
  //         backgroundColor: '#EEEEEE',
  //         width: '800px',
  //         marginLeft: 'auto',
  //         marginRight: 'auto',
  //         marginTop: '100px',
  //         marginBottom: '100px',
  //         borderRadius: '10px',
  //       }}
  //     >
  //       <div
  //         className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
  //         style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           marginLeft: 'auto',
  //           marginRight: 'auto',
  //           justifyContent: 'center',
  //           marginTop: '1.5rem',
  //           marginBottom: '1.5rem',
  //           width: '350px',
  //         }}
  //       >
  //         <div
  //           className="flex flex-col space-y-2 text-center"
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'column',
  //             marginTop: '0.5rem',
  //             marginBottom: '0.5rem',
  //             textAlign: 'center',
  //           }}
  //         >
  //           <h1
  //             className="text-2xl font-semibold tracking-tight"
  //             style={{
  //               fontSize: '2rem',
  //               lineHeight: '2rem',
  //               fontWeight: '900',
  //               letterSpacing: '-0.05em',
  //               marginBottom: '0.5rem',
  //             }}
  //           >
  //             FORGOT PASSWORD
  //           </h1>
  //         </div>
  //         <UserAuthFormForgotPassword />
  //       </div>
  //     </div>
  //   </>
  // );
};
