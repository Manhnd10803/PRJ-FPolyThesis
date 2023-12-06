import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { About } from './about';
import MyPhoto from './my-photo';
import { FriendList } from './friend-list';
import './index.css';
import { CreateNewPost } from '../../home/components/create-new-post';
import { PostContainer } from '../../home/components/post';

export const Timeline = ({ about, isLoading, isUser, listImage, listFriend }) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const topThreshold = 50;

      if (offset >= topThreshold) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Card.Body className="p-0">
      <Row>
        {/* scroller */}
        {/* <Col lg={4} className={`${isSticky ? 'sticky-col-4' : ''}`}> */}
        <Col lg={4}>
          <About aboutUser={about} isLoading={isLoading} />
          <MyPhoto listPhoto={listImage} />
          <FriendList listFriend={listFriend} />
        </Col>
        <Col lg={8}>
          {isUser ? <CreateNewPost /> : ''}
          <PostContainer />
        </Col>
      </Row>
    </Card.Body>
  );
};
