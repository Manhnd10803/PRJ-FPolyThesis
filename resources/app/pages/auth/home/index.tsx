import { Col, Container, Row } from 'react-bootstrap';

import { CreateNewPost } from './components/create-new-post';
import { PostContainer } from './components/post/';
// import { ListBirthDay } from './components/list-birthday';
// import { ListEvent } from './components/list-event';
// import { ListSuggestedPages } from './components/list-suggested-pages';

export const HomePage = () => {
  //render
  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row>
          <Col lg={2} />
          {/* ==== render left content ==== */}
          <Col lg={8} className="row m-0 p-0">
            <CreateNewPost />
            <PostContainer />
          </Col>
          {/* ==== render right content ==== */}
          {/* <Col lg={4}>
            <ListEvent />
            <ListBirthDay />
            <ListSuggestedPages />
          </Col> */}
          <Col lg={2} />
        </Row>
      </Container>
    </div>
  );
};
