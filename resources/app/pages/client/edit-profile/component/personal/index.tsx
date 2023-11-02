import { Button, Col, Form, Row } from 'react-bootstrap';

export const Personal = ({ AccountShow }: any) => {
  return (
    <>
      <div className="form-card text-left">
        <Row>
          <div className="col-12">
            <h3 className="mb-4">User Information:</h3>
          </div>
        </Row>
        <Row>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Tên: *</Form.Label>
              <Form.Control type="text" id="fname" name="fname" placeholder="First Name" />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Họ: *</Form.Label>
              <Form.Control type="text" id="lname" name="lname" placeholder="Last Name" />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Username: *</Form.Label>
              <Form.Control type="text" id="lname" name="lname" placeholder="User Name" />
            </Form.Group>
          </Col>
          <Col md="6" className="mb-3">
            <Form.Label className="form-label" htmlFor="validationDefault041">
              Major
            </Form.Label>
            <Form.Select id="validationDefault041" required>
              <option defaultValue="">Choose...</option>
              <option>Lập trình PHP</option>
              <option>Quản lý khách sạn</option>
              <option>Marketing</option>
            </Form.Select>
          </Col>
          <Col md="12">
            <Form.Group className="form-group">
              <Form.Label>Giới tính: *</Form.Label>
              <Form.Check className="form-check">
                <Form.Check className="form-check form-check-inline">
                  <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio1" />
                  <Form.Check.Label> Nam</Form.Check.Label>
                </Form.Check>
                <Form.Check className="form-check form-check-inline">
                  <Form.Check.Input type="radio" className="form-check-input" name="customRadio" id="customRadio2" />
                  <Form.Check.Label> Nữ</Form.Check.Label>
                </Form.Check>
              </Form.Check>
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group className="form-group">
              <Form.Label>Date Of Birth: *</Form.Label>
              <Form.Control type="date" id="dob" name="dob" />
            </Form.Group>
          </Col>
          <Form.Group className="col-md-12 form-group mb-3 ">
            <Form.Label>Bio: *</Form.Label>
            <Form.Control as="textarea" name="bio"></Form.Control>
          </Form.Group>
        </Row>
      </div>
      <Button
        id="submit"
        name="next"
        variant="primary"
        className="float-end"
        value="Next"
        onClick={() => AccountShow('Account')}
      >
        Next
      </Button>
    </>
  );
};
