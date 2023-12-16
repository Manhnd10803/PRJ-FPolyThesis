import { Skeleton } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CardLoad = () => {
  return (
    <Col sm={3}>
      <Card className="mb-3">
        <Link to={`#`}>
          <Skeleton
            height={160}
            variant="rounded"
            style={{
              width: '100%',
              aspectRatio: '4/3',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Link>
        <Card.Body>
          <Link to={`#`}>
            <Card.Title as="h5" className="card-title">
              <Skeleton height={15} width={150} variant="rounded" />
            </Card.Title>
          </Link>
          <Card.Text className="card-text">
            <Skeleton height={15} width={150} variant="rounded" />
          </Card.Text>
          <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
            <Link to="#" className=" rounded confirm-btn">
              <Skeleton height={34} width={160} variant="rounded" />
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
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
