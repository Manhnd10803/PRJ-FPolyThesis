import { useState } from 'react';
import { Button, Col, Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Card, CustomToggle } from '@/components/custom';
import { formatDateFromCreatedAt } from '../../components/format-date';
import { icon1, icon2, icon4, icon6, icon7 } from '../../components/icon';

export const ContentBlogDetail = ({ data, postLike }: any) => {
  const [isContentExpanded, setContentExpanded] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [likeCount, setLikeCount] = useState(140); // Default like count
  const [likers, setLikers] = useState([]);
  const [showEmotionDropdown, setShowEmotionDropdown] = useState(false);

  const toggleContent = () => {
    setContentExpanded(!isContentExpanded);
  };
  const emotions = [
    { icon: icon1, name: 'like' },
    { icon: icon2, name: 'love' },
    { icon: icon4, name: 'haha' },
    { icon: icon6, name: 'sad' },
    { icon: icon7, name: 'angry' },
  ];

  const handleEmotionSelect = emotion => {
    let NameEmotion = emotion;
    if (selectedEmotion === NameEmotion) {
      setSelectedEmotion(null);
      setLikeCount(likeCount - 1);
      setLikers(likers.filter(liker => liker !== emotion.name));
    } else {
      setSelectedEmotion(emotion);
      setLikeCount(likeCount + 1);
      if (!likers.includes(emotion.name)) {
        setLikers([...likers, emotion.name]);
      }
    }
    console.log(NameEmotion.name);
    postLike(NameEmotion.name);
    setShowEmotionDropdown(false);
  };

  const handleLikeHover = () => {
    setShowEmotionDropdown(true);
  };

  const handleLikeLeave = () => {
    setShowEmotionDropdown(false);
  };

  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog blog-detail">
          <Card.Body>
            <div className="image-block">
              <Image src={data?.thumbnail} className="img-fluid rounded w-100" alt="blog-img" />
              {data?.likes ? data?.likes.length : 0}
            </div>

            <div className="blog-description mt-3">
              <h5 className="mb-3 pb-3 border-bottom">{data?.title}</h5>
              <div className="blog-meta d-flex align-items-center  gap-4 mb-3 position-right-side flex-wrap">
                <div className="date date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>
                  {formatDateFromCreatedAt(data?.created_at)}
                </div>
                <div className="like date  d-flex align-items-center" style={{ width: '80px' }}>
                  <div className="d-flex align-items-center">
                    <Dropdown
                      show={showEmotionDropdown}
                      onMouseEnter={handleLikeHover}
                      onMouseLeave={handleLikeLeave}
                      className="inline-flex gap-2"
                    >
                      <Dropdown.Toggle as={CustomToggle}>
                        {selectedEmotion ? (
                          <img src={selectedEmotion.icon} width={20} className="img-fluid" alt={selectedEmotion.name} />
                        ) : (
                          <img src={icon1} className="img-fluid" width={20} alt="Like" />
                        )}
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        className={`py-2 ${showEmotionDropdown ? 'd-flex gap-1 bg-transparent border-0' : ''}`}
                      >
                        {emotions.map((emotion, index) => (
                          <OverlayTrigger
                            key={index}
                            placement="top"
                            overlay={<Tooltip>{emotion.name}</Tooltip>}
                            className="me-2"
                          >
                            <img
                              src={emotion.icon}
                              width={30}
                              className={`img-fluid ${selectedEmotion === emotion ? 'selected' : ''}`}
                              alt={emotion.name}
                              onClick={() => handleEmotionSelect(emotion)}
                            />
                          </OverlayTrigger>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="link" onMouseEnter={handleLikeHover} onMouseLeave={handleLikeLeave}>
                      <span
                        className={`fw-bold ${
                          selectedEmotion
                            ? selectedEmotion.name === 'Like'
                              ? 'text-primary'
                              : selectedEmotion.name === 'Love'
                              ? 'text-danger'
                              : 'text-warning'
                            : 'text-primary'
                        }`}
                      >
                        {selectedEmotion ? selectedEmotion.name : 'Like'}
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="comments date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                  {data?.comments ? data?.comments.length : 0} comments
                </div>
                <div className="share date  d-flex align-items-center">
                  <i className="material-symbols-outlined pe-2 md-18 text-primary">share</i>share
                </div>
              </div>

              <p>{isContentExpanded ? data?.content : data?.content.slice(0, 200)}</p>
              {data?.content.length > 200 && (
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
