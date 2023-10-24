import { Col, Image } from 'react-bootstrap';
import { Card } from '@/components/custom';
import { formatDateFromCreatedAt } from '../../components/format-date';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export const ContentBlogDetail = ({ data }: any) => {
  const [isContentExpanded, setContentExpanded] = useState(false);

  const toggleContent = () => {
    setContentExpanded(!isContentExpanded);
  };

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog blog-detail">
          <Card.Body>
            <div className="image-block">
              <Image src={data?.thumbnail} className="img-fluid rounded w-100" alt="blog-img" />
            </div>
            <div className="blog-description mt-3">
              <h5 className="mb-3 pb-3 border-bottom">{data?.title}</h5>
              <div className="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap">
                <div className="date date me-4 d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>
                  {formatDateFromCreatedAt(data?.created_at)}
                </div>
                <div className="like date me-4 d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">thumb_up_alt</i>
                  {data?.likes ? data?.likes?.length : 0} like
                </div>
                <div className="comments date me-4 d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                  {data?.comments ? data?.comments?.length : 0} comments
                </div>
                <div className="share date me-4 d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">share</i>share
                </div>
              </div>
              <p>
                {isContentExpanded ? data?.content : data?.content.slice(0, 200)}{' '}
                {/* Hiển thị toàn bộ nội dung hoặc chỉ 200 ký tự ban đầu */}
              </p>
              {data?.content.length > 200 && (
                <Link className="d-flex align-items-center" to="#" onClick={toggleContent}>
                  {isContentExpanded ? 'Read Less' : 'Read More'}
                  <i className="material-symbols-outlined md-14 filled">arrow_forward_ios</i>
                </Link>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
