import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { About } from './about';
import MyPhoto from './my-photo';
import { FriendList } from './friend-list';
import './index.css';
import { CreateNewPost } from '../../home/components/create-new-post';
import { PostContainer } from '../../home/components/post';
import { IPost } from '@/models/post';
import { useInView } from 'react-intersection-observer';

type TimelineProps = {
  about: any;
  isLoading: boolean;
  isUser: boolean;
  listFriend: any;
  idUser: any;
  listPost: any;
  hasNextPage: any;
  isFetching: boolean;
  fetchNextPage: any;
  listImage: any;
};

export const Timeline = ({
  about,
  isLoading,
  isUser,
  idUser,
  listPost,
  hasNextPage,
  isFetching,
  fetchNextPage,
  listFriend,
  listImage,
}: TimelineProps) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const topThreshold = 10;

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

  const { ref: endRefPost, inView: endInViewPost } = useInView();

  useEffect(() => {
    if (endInViewPost && hasNextPage && !isFetching) {
      fetchNextPage && fetchNextPage();
    }
  }, [endInViewPost, fetchNextPage, hasNextPage, isFetching]);

  return (
    <Card.Body>
      <Row>
        <Col lg={4} className={`${isSticky ? 'about-profile' : ''} p-0`}>
          <About aboutUser={about} isLoading={isLoading} />
          <MyPhoto listPhoto={listImage} />
          <FriendList listFriend={listFriend} idUser={idUser} />
        </Col>
        <Col lg={8}>
          {isUser ? <CreateNewPost /> : ''}
          <PostContainer />
          <div ref={endRefPost} />
        </Col>
      </Row>
    </Card.Body>
  );
};
