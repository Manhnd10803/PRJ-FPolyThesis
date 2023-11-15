import { Col, Container, Row } from 'react-bootstrap';

import { CreateNewPost } from './components/create-new-post';
import { PostList } from './components/post/post-list';
import { ListBirthDay } from './components/list-birthday';
import { ListEvent } from './components/list-event';
import { ListSuggestedPages } from './components/list-suggested-pages';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const HomePage = () => {
  //render
  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row>
          {/* ==== render left content ==== */}
          <Col lg={8} className="row m-0 p-0">
            <CreateNewPost />
            <PostList />
          </Col>
          {/* ==== render right content ==== */}
          <Col lg={4}>
            <ListEvent />
            <ListBirthDay />
            <ListSuggestedPages />
          </Col>

          {/*=========  loading more icon=========*/}
          <div className="col-sm-12 text-center">
            <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
          </div>
        </Row>
      </Container>
    </div>
  );
};
