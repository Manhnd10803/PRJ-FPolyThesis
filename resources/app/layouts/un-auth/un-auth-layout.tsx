import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Autoplay, Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import login1 from '@/assets/images/login/1.png';
import login2 from '@/assets/images/login/2.png';
import login3 from '@/assets/images/login/3.png';
import logo from '@/assets/images/logo-bee-full.png';
import { pathName } from '@/routes/path-name';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';

// install Swiper modules

export const UnAuthLayout = () => {
  const navigate = useNavigate();
  const token = StorageFunc.getAccessToken();

  useEffect(() => {
    // Nếu là trang login mà đã đăng nhập rồi thì cho về trang trước
    if (window.location.pathname === pathName.LOGIN && token) {
      navigate(-1);
    }
  }, [token, navigate]);

  // Nếu là trang login mà đã đăng nhập rồi thì hiển thị null
  if (window.location.pathname === pathName.LOGIN && token) {
    return null;
  }
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
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image src={login1} className="img-fluid" alt="logo" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src={login2} className="img-fluid" alt="logo" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image src={login3} className="img-fluid" alt="logo" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Outlet />
          </Row>
        </Container>
      </section>
    </>
  );
};
