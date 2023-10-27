import { Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { icon1, icon2, icon3, icon4 } from './icon';
import { Card } from '@/components/custom';
export const ListCard = () => {
  const truncateTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  };
  return (
    <Row>
      <Col lg="12">
        <Card className={`card-block card-stretch card-height blog-list`}>
          <Card.Body>
            <Row className="align-items-center">
              <Col md="6">
                <div className="image-block">
                  <Image
                    src={
                      'https://images.unsplash.com/photo-1698319361163-69baf7fad322?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8'
                    }
                    className="img-fluid rounded w-100"
                    alt="blog-img"
                  />
                </div>
              </Col>

              <Col md="6">
                <div className="blog-description rounded p-2">
                  <div className="date">
                    <Link to="#">2 ngày </Link>
                  </div>
                  <h5 className="mb-2">Chuyên để React js nâng cao</h5>
                  <div style={truncateTextStyle}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eveniet magni enim doloribus
                    deserunt fuga dolor sequi praesentium earum magnam.
                  </div>
                  <Button className="d-flex align-items-center">
                    Read More <i className="material-symbols-outlined md-14 filled">arrow_forward_ios</i>
                  </Button>
                  <div className="group-smile mt-4 d-flex flex-wrap align-items-center justify-content-between position-right-side">
                    <div className="iq-media-group">
                      <Link to="#" className="iq-media">
                        <Image className="img-fluid rounded-circle" src={icon1} alt="" />
                      </Link>
                      <Link to="#" className="iq-media">
                        <Image className="img-fluid rounded-circle" src={icon2} alt="" />
                      </Link>
                      <Link to="#" className="iq-media">
                        <Image className="img-fluid rounded-circle" src={icon3} alt="" />
                      </Link>
                      <Link to="#" className="iq-media">
                        <Image className="img-fluid rounded-circle" src={icon4} alt="" />
                      </Link>
                    </div>
                    <div className="comment d-flex align-items-center">
                      <i className="material-symbols-outlined me-2 md-18">chat_bubble_outline</i>4 bình luận
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
