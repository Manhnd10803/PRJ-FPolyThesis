import { Card, Col, Row } from 'react-bootstrap';
import { CreatePost } from './components/create-post';
import { ListPost } from './list-post';
import { About } from './about';
import MyPhoto from './my-photo';
import { FriendList } from './friend-list';
export const Timeline = ({ about, listPost, isLoading, friend_id }) => {
  return (
    <>
      <Card.Body className=" p-0">
        <Row>
          <Col lg={4}>
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
    </>
  );
};
