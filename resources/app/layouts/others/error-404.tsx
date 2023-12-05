import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// img
import error404 from '@/assets/images/page/400.png';

const Error404 = () => {
  const history = useNavigate();

  return (
    <>
      <Container className="p-0">
        <Row className="no-gutters height-self-center">
          <Col sm="12" className="text-center align-self-center">
            <div className="iq-error position-relative mt-5">
              <Image src={error404} className="img-fluid iq-error-img" alt="" />
              <h2 className="mb-0 text-center">Rất tiếc! Không tìm thấy trang này.</h2>
              <p className="text-center">Trang yêu cầu không tồn tại.</p>
              <Button variant="primary" className="mt-3" onClick={() => history('/')}>
                <i className="ri-home-4-line me-1"></i>Về trang chủ
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Error404;
