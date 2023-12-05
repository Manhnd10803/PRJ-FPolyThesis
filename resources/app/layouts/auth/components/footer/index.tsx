import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('dark');
  if (mode !== null) {
    document.body.classList = '';
    switch (mode) {
      case 'true':
        document.body.classList = 'dark';
        break;
      case 'false':
        document.body.classList = '';
        break;
      default:
        document.body.classList = '';
        break;
    }
  }
  return (
    <>
      <footer className="iq-footer bg-white">
        <Container fluid>
          <Row>
            <Col lg="6">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link to="/dashboard/extrapages/privacy-policy">Chính sách bảo mật</Link>
                </li>{' '}
                <li className="list-inline-item">
                  <Link to="/dashboard/extrapages/terms-of-service">Điều khoản sử dụng</Link>
                </li>
              </ul>
            </Col>
            <Col lg="6" className="d-flex justify-content-end">
              <span>
                Bản quyền {new Date().getFullYear()}
                <Link to="#"> Fpoly Zone </Link> .
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
