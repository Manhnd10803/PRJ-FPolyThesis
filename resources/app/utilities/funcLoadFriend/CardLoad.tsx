import { Skeleton } from '@mui/material';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CardLoad = () => {
  return (
    <Col xl={3} lg={4} md={6} sm={12}>
      <Card className="mb-3">
        <Link to={`#`}>
          <Skeleton
            height="100%"
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
            <Card.Title as="h5" className="card-title ">
              <Skeleton height={15} width="100%" variant="rounded" />
            </Card.Title>
          </Link>
          <Card.Text className="card-text mt-4">
            <Skeleton height={15} width="100%" variant="rounded" />
          </Card.Text>
          <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
            <Link to="#" className=" rounded confirm-btn">
              <Skeleton height={34} width="100%" variant="rounded" />
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export const CardLoadFriendRequest = () => {
  return (
    <Col xl={3} lg={4} md={6} sm={12}>
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
            <Card.Title as="h5" className="card-title ">
              <Skeleton height={15} width="100%" variant="rounded" />
            </Card.Title>
          </Link>
          <Card.Text className="card-text mt-3">
            <Skeleton height={15} width="100%" variant="rounded" />
          </Card.Text>
          <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
            <Link to="#" className=" rounded confirm-btn">
              <Skeleton height={34} width="100%" variant="rounded" />
            </Link>
            <Link to="#" className=" rounded confirm-btn">
              <Skeleton height={34} width="100%" variant="rounded" />
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
export const CardLoadFriendOther = () => {
  return (
    <Col xl={3} lg={4} md={6} sm={12}>
      <Link to={`#`} className="text-black">
        <Card className="mb-3">
          <Skeleton height={193} variant="rounded" />

          <Card.Body>
            <Card.Title as="h5" className="card-title">
              <Skeleton height={15} width="100%" variant="rounded" />
            </Card.Title>
            <Card.Text className="card-text">
              {' '}
              <Skeleton height={13} width="100%" variant="rounded" />
            </Card.Text>
            <div className="d-flex flex-column gap-2 mt-2 mt-md-0"></div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};
export const CardLoadQaSearch = () => {
  return (
    <Row>
      <Link to={`#`} className="text-black">
        <Card.Body className="p-3">
          <div className="borderbox1 mt-3 rounded d-flex rounded">
            <div className="user-img me-2">
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </div>
            <div className="borderbox border rounded p-2">
              <div className="d-flex flex-wrap mb-1">
                <div>
                  <div>
                    <Skeleton height={10} width={120} variant="rounded" />{' '}
                    <p className="mt-3">
                      {' '}
                      <Skeleton height={10} width={110} variant="rounded" />
                    </p>
                  </div>
                </div>
                <span className="text-primary ms-1 d-flex  align-items-start">
                  <Link to="#" className="mb-0">
                    <Skeleton height={10} width={90} variant="rounded" />
                  </Link>
                </span>
                <div className="ms-auto d-flex">
                  <div className="ms-auto d-flex ">
                    <>
                      <span className="mx-1">
                        <small>
                          <Skeleton height={10} width={70} variant="rounded" />
                        </small>
                      </span>
                    </>
                  </div>
                  <div className="ms-auto d-flex ">
                    <span className="mx-1">
                      <small>
                        <Skeleton height={10} width={70} variant="rounded" />
                      </small>
                    </span>
                  </div>
                  <div className="ms-auto d-flex ">
                    <span className="mx-1">
                      <small>
                        <Skeleton height={10} width={70} variant="rounded" />
                      </small>
                    </span>
                  </div>
                </div>
              </div>
              <Link to={'#'} className="h5">
                <Skeleton height={20} width={400} variant="rounded" />
              </Link>
              <div className="mt-3">
                <Row className="mt-2"></Row>
                <div>
                  <Badge as={Link} bg="" to="#" className="badge border  text-danger mt-2 h-1 ms-2 me-2">
                    <Skeleton height={20} width={20} variant="rounded" />
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Link>
    </Row>
  );
};
export const CardLoadBlogSearch = () => {
  return (
    <Row>
      <Link to={`#`} className="text-black">
        <Card.Body className="p-3">
          <div className="borderbox1 mt-3 rounded d-flex rounded">
            <div className="user-img me-2">
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </div>
            <div className="borderbox border rounded p-2">
              <div className="d-flex flex-wrap mb-1">
                <div>
                  <div>
                    <Skeleton height={10} width={120} variant="rounded" />{' '}
                    <p className="mt-3">
                      {' '}
                      <Skeleton height={10} width={110} variant="rounded" />
                    </p>
                  </div>
                </div>
                <span className="text-primary ms-1 d-flex  align-items-start">
                  <Link to="#" className="mb-0">
                    <Skeleton height={10} width={90} variant="rounded" />
                  </Link>
                </span>
                <div className="ms-auto d-flex">
                  <div className="ms-auto d-flex ">
                    <>
                      <span className="mx-1">
                        <small>
                          <Skeleton height={10} width={70} variant="rounded" />
                        </small>
                      </span>
                    </>
                  </div>
                  <div className="ms-auto d-flex ">
                    <span className="mx-1">
                      <small>
                        <Skeleton height={10} width={70} variant="rounded" />
                      </small>
                    </span>
                  </div>
                  <div className="ms-auto d-flex ">
                    <span className="mx-1">
                      <small>
                        <Skeleton height={10} width={70} variant="rounded" />
                      </small>
                    </span>
                  </div>
                </div>
              </div>
              <Link to={'#'} className="h5">
                <Skeleton height={10} width={160} variant="rounded" />
              </Link>
              {/* Hashtag */}
              <div className="mt-3">
                <Skeleton height={30} width={400} variant="rounded" />
                <Row className="mt-2"></Row>
                {/* Hashtag */}
                <div>
                  <Badge as={Link} bg="" to="#" className="badge border  text-danger mt-2 h-1 ms-2 me-2">
                    <Skeleton height={20} width={20} variant="rounded" />
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Link>
    </Row>
  );
};
