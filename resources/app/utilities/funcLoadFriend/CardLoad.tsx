import { Skeleton } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';

export const CardLoad = () => {
  return (
    <Row>
      <Col sm={3}>
        <Skeleton className="skeleton-color" height={196} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton className="skeleton-color" height={20} width={150} />
            <Skeleton className="skeleton-color" height={20} width={150} />
          </div>
        </div>
        <Card.Text className="rounded confirm-btn d-flex justify-content-center">
          <Skeleton className="skeleton-color" height={50} width={160} />
        </Card.Text>
      </Col>
      <Col sm={3}>
        <Skeleton className="skeleton-color" height={199} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton className="skeleton-color" height={20} width={150} />
            <Skeleton className="skeleton-color" height={20} width={150} />
          </div>
        </div>
        <Card.Text className="rounded confirm-btn d-flex justify-content-center">
          <Skeleton className="skeleton-color" height={50} width={160} />
        </Card.Text>
      </Col>
    </Row>
  );
};
export const CardLoadFriendOther = () => {
  return (
    <Row>
      <Col sm={3}>
        <Skeleton className="skeleton-color" height={196} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton className="skeleton-color" height={20} width={150} />
            <Skeleton className="skeleton-color" height={20} width={150} />
          </div>
        </div>
      </Col>
      <Col sm={3}>
        <Skeleton className="skeleton-color" height={199} style={{ width: '100%' }} />
        <div className="rounded confirm-btn d-flex justify-content-center">
          <div>
            <Skeleton className="skeleton-color" height={20} width={150} />
            <Skeleton className="skeleton-color" height={20} width={150} />
          </div>
        </div>
      </Col>
    </Row>
  );
};
