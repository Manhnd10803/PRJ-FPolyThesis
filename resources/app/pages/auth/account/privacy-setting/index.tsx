import { useState } from 'react';
import { Card, Col, Container, Nav, Row, Tab, Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConfirmForm } from './components/form-confirm';
import { ResetForm } from './components/form-reset';

const imageUrl = 'https://picsum.photos/50';

export const PrivacySettingPage = () => {
  const [isResetForm, setIsResetForm] = useState(false);

  const handleContinue = () => {
    // Khi người dùng nhấn "Tiếp tục", chuyển sang trạng thái reset form
    setIsResetForm(true);
  };

  // { listBlog, isLoading }

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card className="position-relative inner-page-bg bg-primary">
                <div
                  className="d-flex flex-wrap align-items-center justify-content-between p-5"
                  style={{ height: '100px' }}
                >
                  <div className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 'bold', fontSize: '25px', color: 'blue', textTransform: 'uppercase' }}
                    >
                      CÀI ĐẶT QUYỀN RIÊNG TƯ
                    </h3>
                  </div>

                  {/* <Link to="" style={{ fontWeight: '600', }}
                    className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block"
                  >
                    Privacy Setting
                  </Link> */}
                </div>
              </Card>
            </Col>
          </Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="about1">
            <Row>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <Nav variant="pills" className=" basic-info-items list-inline d-block p-0 m-0">
                      <Nav.Item>
                        <Nav.Link href="#blog" eventKey="about1" className="d-flex align-items-center gap-3">
                          <i className="material-symbols-outlined">create</i> Bảo mật tài khoản
                        </Nav.Link>
                      </Nav.Item>

                      {/* <Nav.Item>
                        <Nav.Link href="#blog-pending" eventKey="about2" className="d-flex align-items-center gap-3">
                          <i className="material-symbols-outlined">forum</i> Chờ duyệt
                        </Nav.Link>
                      </Nav.Item> */}

                      {/* <Nav.Item>
                        <Nav.Link href="#blog-reject" eventKey="about3" className="d-flex align-items-center gap-3">
                          <i className="material-symbols-outlined">delete</i> Vi phạm
                        </Nav.Link>
                      </Nav.Item> */}
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={9} className="ps-4">
                <Card>
                  <Card.Body>
                    <Tab.Content>
                      <Tab.Pane eventKey="about1">
                        {isResetForm ? <ResetForm /> : <ConfirmForm onContinue={handleContinue} />}
                        {/* <ConfirmForm/> */}
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};
