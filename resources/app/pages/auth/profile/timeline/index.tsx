import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { About } from './about';
import MyPhoto from './my-photo';
import { FriendList } from './friend-list';
import './index.css';
import { CreateNewPost } from './post/components/create-new-post';
import { PostContainer } from './post/components/post';

type TimelineProps = {
  about: any;
  isLoading: boolean;
  isUser: boolean;
  listFriend: any;
  idUser: any;
  listPost: any;
  hasNextPage: any;
  isFetchingNextPage: boolean;
  fetchNextPage: any;
  listImage: any;
  isError?: boolean;
};

export const Timeline = ({
  about,
  isLoading,
  isUser,
  idUser,
  listPost,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  listFriend,
  listImage,
  isError,
}: TimelineProps) => {
  const [isSticky, setSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offset = window.scrollY;
  //     const topThreshold = 10;

  //     if (offset >= topThreshold) {
  //       setSticky(true);
  //     } else {
  //       setSticky(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <Card.Body>
      <Row>
        <Col lg={4} id="about-profile" className="p-0">
          <About aboutUser={about} isLoading={isLoading} />
          <MyPhoto listPhoto={listImage} />
          <FriendList listFriend={listFriend} idUser={idUser} />
        </Col>
        <Col lg={8}>
          {isUser ? <CreateNewPost /> : ''}
          <PostContainer
            isError={isError}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            data={listPost}
            fetchNextPage={fetchNextPage}
          />
        </Col>
      </Row>
    </Card.Body>
  );
};
