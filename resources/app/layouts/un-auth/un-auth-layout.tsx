import { Row, Col, Container, Image } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// @ts-ignore
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
// import 'swiper/components/navigation/navigation.scss';

import logo from '@/assets/images/logo-bee-full.png';
import login1 from '@/assets/images/login/1.png';
import login2 from '@/assets/images/login/2.png';
import login3 from '@/assets/images/login/3.png';

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);
export const UnAuthLayout = () => {
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
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image src={login1} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src={login2} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Connect with the world</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src={login3} className="img-fluid mb-4" alt="logo" />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Outlet />
            <Toaster />
          </Row>
        </Container>
      </section>
    </>
  );
};
