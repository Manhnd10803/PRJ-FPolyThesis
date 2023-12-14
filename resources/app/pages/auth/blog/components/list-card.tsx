import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card } from '@/components/custom';
import parse from 'html-react-parser';
// import moment from 'moment';
import { momentVi } from '@/utilities/functions/moment-locale';
import { pathName } from '@/routes/path-name';
import { hideImages } from '@/utilities/funcJsonImage';
export const ListCard = ({ data }: any) => {
  const truncateTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  };
  // Handle blog detail

  return (
    <Row>
      {data &&
        data.map((itemblog, index) => (
          <Col lg="12" key={index}>
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
                        <Link to="#">{momentVi(itemblog?.blog?.created_at).fromNow()}</Link>
                      </div>
                      <Link to={`${pathName.BLOG}/${itemblog.blog.id}`} style={{ textDecoration: 'none' }}>
                        <h5 className="mb-2">{itemblog.blog.title}</h5>
                        <h6 style={truncateTextStyle}>{parse(hideImages(JSON.parse(itemblog.blog.content)))}</h6>
                      </Link>

                      <div className="group-smile mt-4 d-flex flex-wrap align-items-center justify-content-between position-right-side">
                        <div></div>
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
