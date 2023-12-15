import { Skeleton } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';

export const CardLoad = () => {
  return (
    <Row>
      <Col sm={3}>
        <Skeleton height={196} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
        <Card.Text className="rounded confirm-btn d-flex justify-content-center">
          <Skeleton height={50} width={160} />
        </Card.Text>
      </Col>
      <Col sm={3}>
        <Skeleton height={199} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
        <Card.Text className="rounded confirm-btn d-flex justify-content-center">
          <Skeleton height={50} width={160} />
        </Card.Text>
      </Col>
    </Row>
  );
};
export const CardLoadFriendOther = () => {
  return (
    <Row>
      <Col sm={3}>
        <Skeleton height={196} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
      </Col>
      <Col sm={3}>
        <Skeleton height={199} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
      </Col>
    </Row>
  );
};
export const CardLoadBlog = () => {
  return (
    <Row>
      <Col lg="12" className="mb-3">
        <Card>
          <Card.Body>
            <Row className="align-items-center">
              <Col md="6">
                <div className="image-block">
                  <Skeleton height={250} style={{ width: '100%' }} variant="rounded" />
                </div>
              </Col>
              <Col md="6">
                <div className="blog-description rounded p-2">
                  <Skeleton height={10} width={100} variant="rounded" />
                  <br />
                  <Skeleton height={10} width={70} variant="rounded" />
                  <br />
                  <Skeleton height={20} width={150} variant="rounded" />
                  <br />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col lg="12" className="mb-3">
        <Card>
          <Card.Body>
            <Row className="align-items-center">
              <Col md="6">
                <div className="blog-description rounded p-2" style={{ float: 'right' }}>
                  <Skeleton height={10} width={100} variant="rounded" style={{ float: 'right' }} />
                  <br />
                  <Skeleton height={10} width={70} variant="rounded" style={{ float: 'right' }} />
                  <br />
                  <Skeleton height={20} width={150} variant="rounded" style={{ float: 'right' }} />
                  <br />
                </div>
              </Col>
              <Col md="6">
                <div className="image-block">
                  <Skeleton height={250} style={{ width: '100%' }} variant="rounded" />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
