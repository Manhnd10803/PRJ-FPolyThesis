import { ValidateUserUpdateSchema } from '@/validation/zod/user';
import { Button, Col, Form, Row } from 'react-bootstrap';

export const Personal = ({ DataUser, update, handleNextValidate, validationErrors, DataMajor, watch }: any) => {
  const fields1 = {
    first_name: watch('first_name'),
    last_name: watch('last_name'),
    major_id: watch('major_id'),
  };
  return (
    <>
      <div className="form-card text-left">
        <Row>
          <div className="col-12">
            <h3 className="mb-4">Thông tin người dùng:</h3>
          </div>
        </Row>
        <Row>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Tên: *</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                defaultValue={DataUser?.first_name || ''}
                placeholder="First Name"
                {...update('first_name')}
              />
              {validationErrors.first_name && (
                <div className="error-message text-danger">{validationErrors.first_name}</div>
              )}
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Họ: *</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Last Name"
                defaultValue={DataUser?.last_name}
                {...update('last_name')}
              />
              {validationErrors.last_name && (
                <div className="error-message text-danger">{validationErrors.last_name}</div>
              )}
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group className="form-group">
              <Form.Label>Username: *</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="User Name"
                defaultValue={DataUser?.username || ''}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md="6" className="mb-3">
            <Form.Label className="form-label" htmlFor="validationDefault041">
              Chuyên ngành
            </Form.Label>
            <Form.Select
              id="validationDefault041"
              name="major_id"
              {...update('major_id')}
              defaultValue={DataUser?.major_id || ''}
            >
              <option value="">Choose...</option>
              {DataMajor &&
                Array.isArray(DataMajor) &&
                DataMajor.map((major: any) => (
                  <option key={major.id} value={major.id}>
                    {major.majors_name}
                  </option>
                ))}
            </Form.Select>
            {validationErrors.major_id && <div className="error-message text-danger">{validationErrors.major_id}</div>}
          </Col>
          <Col md="12">
            <Form.Group className="form-group">
              <Form.Label>Giới tính: *</Form.Label>
              <Form.Check className="form-check">
                <Form.Check className="form-check form-check-inline">
                  <Form.Check.Input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="Nam"
                    {...update('gender')}
                    defaultChecked={DataUser?.gender === 'Nam'}
                  />
                  <Form.Check.Label> Nam</Form.Check.Label>
                </Form.Check>
                <Form.Check className="form-check form-check-inline">
                  <Form.Check.Input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    {...update('gender')}
                    value="Nữ"
                    defaultChecked={DataUser?.gender === 'Nữ'}
                  />
                  <Form.Check.Label> Nữ</Form.Check.Label>
                </Form.Check>
              </Form.Check>
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group className="form-group">
              <Form.Label>Ngày sinh: *</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                defaultValue={DataUser?.birthday || ''}
                {...update('birthday')}
              />
            </Form.Group>
          </Col>
          <Form.Group className="col-md-12 form-group mb-3 ">
            <Form.Label>Bio: *</Form.Label>
            <Form.Control
              as="textarea"
              name="biography"
              defaultValue={DataUser?.biography || ''}
              {...update('biography')}
            />
          </Form.Group>
        </Row>
      </div>
      <Button
        id="submit"
        name="next"
        variant="primary"
        className="float-end"
        value="Next"
        onClick={() => handleNextValidate('Account', fields1, ValidateUserUpdateSchema)}
      >
        Tiếp tục
      </Button>
    </>
  );
};
