import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Card } from '../../components/card';
import { Link } from 'react-router-dom';

interface CommentsProps {
  data: {
    title: string;
    content: string;
    date: string;
    likes: number;
    comments: number;
    image: string;
  }[];
}
export const Comments: React.FC<CommentsProps> = ({ data }) => {
  return (
    <>
      {data.map((blog, index) => (
        <Row key={index}>
          <Col lg="12">
            <Card className="card-block card-stretch card-height blog">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="user-image mb-3">
                    <Image className="avatar-80 rounded" src={blog.image} alt="#" data-original-title="" title="" />
                  </div>
                  <div className="ms-3">
                    <h5>Kaya Scodelario</h5>
                    <p>Web Developer</p>
                  </div>
                </div>
                <div className="blog-description">
                  <p>{blog.content}</p>
                  <div className="d-flex align-items-center justify-content-between mb-2 position-right-side">
                    <Link to="#" className="comments d-flex align-items-center">
                      <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                      {blog.comments} comments
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
    </>
  );
};
