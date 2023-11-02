import { Card } from '@/components/custom';
import { useState } from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Personal } from './component/personal';
import { Contact } from './component/contact';
import { Official } from './component/official';
export const EditProfilePage = () => {
  const [show, AccountShow] = useState('A');
  const fieldsetStyle = {
    height: '500px', // Set a fixed height for all fieldset elements (adjust as needed)
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12" lg="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Vertical Wizard</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="3">
                      <ul id="top-tabbar-vertical" className="p-0">
                        <li
                          className={` ${show === '' ? 'active done' : ''} ${show === 'Account' ? 'active done' : ''} ${
                            show === 'Personal' ? 'active done' : ''
                          }  active step1`}
                          id="personal"
                        >
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-primary text-primary">lock_open</i>
                            <span>Personal</span>
                          </Link>
                        </li>
                        <li
                          id="contact"
                          className={` ${show === 'Account' ? 'active done' : ''} ${
                            show === 'Personal' ? 'active done' : ''
                          } ${show === 'Image' ? 'active done' : ''} step2`}
                        >
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-danger text-danger">person</i>
                            <span>Contact</span>
                          </Link>
                        </li>
                        <li
                          id="official"
                          className={` ${show === 'Personal' ? 'active done' : ''} ${
                            show === 'Image' ? 'active done' : ''
                          } step3`}
                        >
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-success text-success">photo_camera</i>
                            <span>Official</span>
                          </Link>
                        </li>
                        <li id="payment" className={` ${show === 'Image' ? 'active done' : ''} step4`}>
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-warning text-warning">done</i>
                            <span>Finish</span>
                          </Link>
                        </li>
                      </ul>
                    </Col>
                    <Col md="9">
                      <Form id="form-wizard3" className="text-start">
                        <fieldset style={fieldsetStyle} className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                          <Personal AccountShow={AccountShow} />
                        </fieldset>
                        <fieldset style={fieldsetStyle} className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                          <Contact AccountShow={AccountShow} />
                        </fieldset>
                        <fieldset style={fieldsetStyle} className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                          <Official AccountShow={AccountShow} />
                        </fieldset>
                        <fieldset style={fieldsetStyle} className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                          <div className="form-card">
                            <Row>
                              <div className="col-7">
                                <h3 className="mb-4 text-left">Finish:</h3>
                              </div>
                              <div className="col-5">
                                <h2 className="steps">Step 4 - 4</h2>
                              </div>
                            </Row>
                            <br />
                            <br />
                            <h2 className="text-success text-center">
                              <strong>SUCCESS !</strong>
                            </h2>
                            <br />
                            <Row className="justify-content-center">
                              <div className="col-3">
                                <Image
                                  src={
                                    'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VjY2Vzc3xlbnwwfHwwfHx8MA%3D%3D'
                                  }
                                  className="img-fluid"
                                  alt="fit-image"
                                />
                              </div>
                            </Row>
                            <br />
                            <br />
                            <Row className="justify-content-center">
                              <div className="col-7 text-center">
                                <h5 className="purple-text text-center">You Have Successfully Signed Up</h5>
                              </div>
                            </Row>
                          </div>
                        </fieldset>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
