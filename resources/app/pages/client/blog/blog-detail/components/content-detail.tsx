import { Col, Image } from 'react-bootstrap';
import { Card } from '@/components/custom';
import { Link } from 'react-router-dom';

export const ContentBlogDetail = () => {
  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog blog-detail">
          <Card.Body>
            <div className="blog-description mt-3">
              <h5 className="mb-3 pb-3 border-bottom">Chuyên để React js nâng cao</h5>
              <div className="blog-meta d-flex align-items-center  gap-4 mb-3 position-right-side flex-wrap">
                <div className="date date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>4 phút trước
                </div>
                <div className="like date me-4 d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">thumb_up_alt</i>
                  20 like
                </div>
                <div className="comments date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>3 comments
                </div>
                <div className="share date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">share</i>share
                </div>
              </div>

              <p>
                Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
              <Link className="d-flex align-items-center" to="#">
                Read More <i className="material-symbols-outlined md-14">arrow_forward_ios</i>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
