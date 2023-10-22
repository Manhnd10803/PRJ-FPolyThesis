import { Col, Container, Row } from 'react-bootstrap';

import { CreateFeed } from './components/feed/create-feed';
import { FeedList } from './components/feed/feed-list';
import { ListBirthDay } from './components/list-birthday';
import { ListEvent } from './components/list-event';
import { ListSuggestedPages } from './components/list-suggested-pages';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const HomePage = () => {
  const renderLeftContent = () => {
    return (
      <Col lg={8} className="row m-0 p-0">
        <CreateFeed />
        <FeedList />
      </Col>
    );
  };

  const renderRightContent = () => {
    return (
      <Col lg={4}>
        <ListEvent />
        <ListBirthDay />
        <ListSuggestedPages />
      </Col>
    );
  };

  //render
  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row>
          {renderLeftContent()}
          {renderRightContent()}

          {/*=========  loading more icon=========*/}
          <div className="col-sm-12 text-center">
            <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
          </div>
        </Row>
      </Container>
    </div>
  );
};
