import { Badge, Button, ButtonGroup, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Card } from '@/components/custom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { useState } from 'react';
import { formatDMYCreatedAt, formatDateFromCreatedAt } from '../../components/format-date';
import { Link } from 'react-router-dom';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
export const ContentBlogDetail = ({ data, commentRef, createLike }: any) => {
  const [likeStatus, setLikeStatus] = useState(data?.user_like?.emotion || null);
  const [isContentExpanded, setContentExpanded] = useState(false);
  const toggleContent = () => {
    setContentExpanded(!isContentExpanded);
  };

  const handleLikeClick = async () => {
    try {
      if (likeStatus !== 'like') {
        await createLike('like');
        setLikeStatus('like');
      } else {
        await createLike('like');
        setLikeStatus(null);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (likeStatus === 'dislike') {
        await createLike('dislike');
        setLikeStatus(null);
      } else {
        await createLike('dislike');
        setLikeStatus('dislike');
      }
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
  console.log(data);

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog blog-detail">
          <Card.Body>
            <div className="blog-description mt-3">
              <div className="d-flex align-items-center">
                <div className="user-image mb-3">
                  <Image className="avatar-80 rounded" src={data?.blog?.user.avatar} alt="Ảnh đại diện" />
                </div>
                <div className="ms-3">
                  <Link to={`${pathName.PROFILE}/${data?.blog?.user.id}`}>
                    <h5>{formatFullName(data?.blog?.user)}</h5>
                    <p className="text-black">{data?.blog?.major?.majors_name}</p>
                  </Link>
                </div>
              </div>
              <div className="blog-meta d-flex align-items-center  gap-4 mb-3 position-right-side flex-wrap">
                <div className="date date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i> Đă đăng vào{' '}
                  {formatDMYCreatedAt(data?.blog?.created_at)} {formatDateFromCreatedAt(data?.blog?.created_at)}
                </div>
                <ButtonGroup aria-label="Basic example">
                  <Button className="d-flex align-items-center gap-2 " variant="light" onClick={handleLikeClick}>
                    {likeStatus === 'like' ? (
                      <ThumbUpIcon className="text-primary" sx={{ fontSize: 20 }} />
                    ) : (
                      <ThumbUpOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
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
                    {likeStatus === 'dislike' ? (
                      <ThumbDownIcon className="text-primary" sx={{ fontSize: 20 }} />
                    ) : (
                      <ThumbDownOffAltOutlinedIcon className="text-primary" sx={{ fontSize: 20 }} />
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
