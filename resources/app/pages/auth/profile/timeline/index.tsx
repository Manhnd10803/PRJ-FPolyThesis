import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { CreatePost } from './components/create-post';
import { ListPost } from './list-post';
import { About } from './about';
import MyPhoto from './my-photo';
import { FriendList } from './friend-list';
import './index.css';

export const Timeline = ({ about, listPost, isLoading, friend_id }) => {
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
        <Col lg={4} className={`col-4 ${isSticky ? 'sticky-col-4' : ''}`}>
          <About aboutUser={about} isLoading={isLoading} />
          <MyPhoto />
          <FriendList />
        </Col>
        <Col lg={8}>
          {!friend_id ? <CreatePost /> : ''}
          <ListPost listPost={listPost} isLoading={isLoading} />
        </Col>
      </Row>
    </Card.Body>
  );
};
