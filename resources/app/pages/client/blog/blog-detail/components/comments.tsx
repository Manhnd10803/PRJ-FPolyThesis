import { Card } from '@/components/custom';
import { CommentType } from '@/models/blog';
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Comments: React.FC<{ data: CommentType[] }> = ({ data }) => {
  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog user-comment">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">User Comment</h4>
            </div>
          </Card.Header>
          <Card.Body>
            {data &&
              data.map((comment, index) => (
                <Row key={index}>
                  <Col lg="12">
                    <Card className="card-block card-stretch card-height blog">
                      <Card.Body>
                        <div className="d-flex align-items-center">
                          <div className="user-image mb-3">
                            <Image
                              className="avatar-80 rounded"
                              src={comment?.user?.avatar}
                              alt="#"
                              data-original-title=""
                              title=""
                            />
                          </div>
                          <div className="ms-3">
                            <h5>Kaya Scodelario</h5>
                            <p>{comment?.user?.major?.majors_name}</p>
                          </div>
                        </div>
                        <div className="blog-description">
                          <p>{comment.content}</p>
                          <div className="d-flex align-items-center justify-content-between mb-2 position-right-side">
                            <Link to="#" className="comments d-flex align-items-center">
                              <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                              {comment.created_at} comments
                            </Link>
                            <span className="font-size-12 text-warning">
                              <i className="material-symbols-outlined md-18">star_half</i>
                              <i className="material-symbols-outlined md-18">star</i>
                              <i className="material-symbols-outlined md-18">star</i>
                              <i className="material-symbols-outlined md-18">star</i>
                              <i className="material-symbols-outlined md-18">star</i>
                              <i className="material-symbols-outlined md-18">star</i>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))}
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
