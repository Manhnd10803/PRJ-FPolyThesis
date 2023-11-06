import { Image, Row } from 'react-bootstrap';
import ImageSuccess from '@/assets/images/img-success.png';
export const Finish = () => {
  return (
    <div className="form-card">
      <br />
      <br />
      <h2 className="text-success text-center">
        <strong>SUCCESS !</strong>
      </h2>
      <br />
      <Row className="justify-content-center">
        <div className="col-3">
          <Image src={ImageSuccess} className="img-fluid" alt="img-success" />
        </div>
      </Row>
      <br />
      <br />
      <Row className="justify-content-center">
        <div className="col-7 text-center">
          <h5 className="purple-text text-center">Bạn đã hoàn thành cập nhật </h5>
        </div>
      </Row>
    </div>
  );
};
