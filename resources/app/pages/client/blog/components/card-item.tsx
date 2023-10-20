import { Row, Col, Image } from 'react-bootstrap';
import { Card } from './card';
import { Link } from 'react-router-dom';

import { icon1, icon2, icon3, icon4 } from './icon';

interface CardItemProps {
  data: {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
  }[];
}

export const CardItem: React.FC<CardItemProps> = ({ data }) => {
  return (
    <Row>
      {data.map((blog, index) => (
        <Col lg="12" key={blog.id}>
          <Card className={`card-block card-stretch card-height blog-list ${index % 2 === 0 ? '' : 'list-even'}`}>
            <Card.Body>
              <Row className="align-items-center">
                {index % 2 === 0 ? ( // Nếu index là chẵn, hiển thị ảnh bên trái
                  <Col md="6">
                    <div className="image-block">
                      <Image src={blog.image} className="img-fluid rounded w-100" alt="blog-img" />
                    </div>
                  </Col>
                ) : null}

                <Col md="6">
                  <div className="blog-description rounded p-2">
                    <div className="date">
                      <Link to="#">{blog.date}</Link>
                    </div>
                    <h5 className="mb-2">{blog.title}</h5>
                    <p>{blog.description}</p>
                    <Link to="#" className="d-flex align-items-center">
                      Read More <i className="material-symbols-outlined md-14 filled">arrow_forward_ios</i>
                    </Link>
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
                        <i className="material-symbols-outlined me-2 md-18">chat_bubble_outline</i>7 comments
                      </div>
                    </div>
                  </div>
                </Col>

                {index % 2 !== 0 ? ( // Nếu index là lẻ, hiển thị ảnh bên trái
                  <Col md="6">
                    <div className="image-block">
                      <Image src={blog.image} className="img-fluid rounded w-100" alt="blog-img" />
                    </div>
                  </Col>
                ) : null}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
