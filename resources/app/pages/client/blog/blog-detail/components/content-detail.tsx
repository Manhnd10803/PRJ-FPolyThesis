import { Badge, Button, ButtonGroup, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Card } from '@/components/custom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { useState } from 'react';
import { formatDMYCreatedAt, formatDateFromCreatedAt } from '../../components/format-date';
import { Link } from 'react-router-dom';
export const ContentBlogDetail = ({ data, commentRef, createLike }: any) => {
  const [liked, setLiked] = useState(false);
  const [showUnlike, setShowUnlike] = useState(false);
  const [isContentExpanded, setContentExpanded] = useState(false);
  const toggleContent = () => {
    setContentExpanded(!isContentExpanded);
  };

  // Like Unlike
  const handleLikeClick = async () => {
    try {
      await createLike('like');
      setLiked(!liked);
      setShowUnlike(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDislikeClick = async () => {
    try {
      await createLike('dislike');
      setLiked(false);
      setShowUnlike(!showUnlike);
    } catch (error) {
      throw error;
    }
  };

  //comment
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog blog-detail">
          <Card.Body>
            <div className="blog-description mt-3">
              <div className="d-flex align-items-center">
                <div className="user-image mb-3">
                  <Image
                    className="avatar-80 rounded"
                    src={
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww'
                    }
                    alt="#"
                    data-original-title=""
                    title=""
                  />
                </div>
                <div className="ms-3">
                  <h5>{data?.blog?.user?.username}</h5>
                  <p>{data?.blog?.major?.majors_name}</p>
                </div>
              </div>
              <div className="blog-meta d-flex align-items-center  gap-4 mb-3 position-right-side flex-wrap">
                <div className="date date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i> Đă đăng vào{' '}
                  {formatDMYCreatedAt(data?.blog?.created_at)} {formatDateFromCreatedAt(data?.blog?.created_at)}
                </div>
                <ButtonGroup aria-label="Basic example">
                  <Button className="d-flex align-items-center gap-2 " variant="light" onClick={handleLikeClick}>
                    {liked ? (
                      <>
                        <ThumbUpIcon className="text-primary" sx={{ fontSize: 20 }} />
                      </>
                    ) : (
                      <>
                        <ThumbUpOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
                      </>
                    )}
                    <Badge bg="primary" className=" text-white ml-2">
                      {data?.emotion?.like || '0'}
                    </Badge>
                  </Button>

                  <Button
                    className="d-flex align-items-center"
                    variant="light"
                    onClick={handleDislikeClick}
                    data-bs-placement="bottom"
                  >
                    {showUnlike ? (
                      <>
                        <ThumbDownIcon className="text-primary" sx={{ fontSize: 20 }} />
                      </>
                    ) : (
                      <>
                        <ThumbDownOffAltOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
                      </>
                    )}
                  </Button>
                </ButtonGroup>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Di chuyển tới bình luận</Tooltip>}>
                  <Link to={'#'} className="d-flex align-items-center cursor-pointer" onClick={scrollToComment}>
                    <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                    {data?.total_comments} comments
                  </Link>
                </OverlayTrigger>
                <div className="share date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">share</i>share
                </div>
              </div>
              <h5 className="mb-3 pb-3 border-bottom">{data?.blog?.title}</h5>

              <p>{isContentExpanded ? data?.blog?.content : data?.blog?.content.slice(0, 200)}</p>
              {data?.blog?.content.length > 200 && (
                <div className="d-flex align-items-center text-primary" onClick={toggleContent} role="button">
                  {isContentExpanded ? 'Read Less' : 'Read More'}
                  <i className="material-symbols-outlined md-14 filled">arrow_forward_ios</i>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
