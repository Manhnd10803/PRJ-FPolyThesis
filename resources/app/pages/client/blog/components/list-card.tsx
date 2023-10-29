import { Row, Col, Image, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { icon1, icon2, icon3, icon4 } from './icon';
import { Card } from '@/components/custom';
import { formatDateFromCreatedAt } from './format-date';
export const ListCard = ({ data }: any) => {
  const navigate = useNavigate();
  const truncateTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  };

  // Handle blog detail
  const handleDetailsClick = (id: number) => {
    navigate(`/blog-detail/${id}`);
    console.log(`View details of user with ID ${id}`);
  };
  return (
    <Row>
      {data &&
        data.map((itemblog, index) => (
          <Col lg="12" key={itemblog.blog.id}>
            <Card className={`card-block card-stretch card-height blog-list ${index % 2 === 0 ? '' : 'list-even'}`}>
              <Card.Body>
                <Row className="align-items-center">
                  {index % 2 === 0 ? ( // Nếu index là chẵn, hiển thị ảnh bên trái
                    <Col md="6">
                      <div className="image-block">
                        <Image src={itemblog.blog.thumbnail} className="img-fluid rounded w-100" alt="blog-img" />
                      </div>
                    </Col>
                  ) : null}

                  <Col md="6">
                    <div className="blog-description rounded p-2">
                      <div className="date">
                        <Link to="#">{formatDateFromCreatedAt(itemblog.blog.created_at)}</Link>
                      </div>
                      <h5 className="mb-2">{itemblog.blog.title}</h5>
                      <div style={truncateTextStyle}>{itemblog.blog.content}</div>
                      <Button
                        onClick={() => handleDetailsClick(itemblog.blog.id)}
                        className="d-flex align-items-center"
                      >
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
                        <div className="d-flex">
                          <div className="like date me-4 d-flex align-items-center">
                            {itemblog.like_counts_by_emotion.total_likes > 0 ? (
                              <>
                                <i className="material-symbols-outlined pe-2 md-18 text-primary">thumb_up_alt</i>
                                {itemblog.like_counts_by_emotion.total_likes} like
                              </>
                            ) : null}
                          </div>
                          <div className="comment d-flex align-items-center">
                            <i className="material-symbols-outlined me-2 md-18">chat_bubble_outline</i>
                            {itemblog.total_comments ? itemblog.total_comments : '0'} bình luận
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  {index % 2 !== 0 ? (
                    <Col md="6">
                      <div className="image-block">
                        <Image src={itemblog.blog.thumbnail} className="img-fluid rounded w-100" alt="blog-img" />
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
