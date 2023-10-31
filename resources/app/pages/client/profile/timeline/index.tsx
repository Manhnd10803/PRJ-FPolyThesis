import { Card, Col, Row } from 'react-bootstrap';
import { CreatePost } from './components/create-post';
import { ListPost } from './list-post';
import { About } from './about';
import MyPhoto from './my-photo';
import { FriendList } from './friend-list';
export const Timeline = () => {
  return (
    <>
      <Card.Body className=" p-0">
        <Row>
          <Col lg={4}>
            <About />
            <MyPhoto />
            <FriendList />
          </Col>
          <Col lg={8}>
            <CreatePost />
            <ListPost />
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};
