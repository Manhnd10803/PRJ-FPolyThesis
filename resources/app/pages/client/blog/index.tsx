import { Container, Col } from 'react-bootstrap';
import { ListCard } from './components/list-card';
import { Link } from 'react-router-dom';

export const BlogPage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Col sm={12}>
            <div
              className="bg-primary d-flex justify-content-between align-items-center px-3 mb-3 rounded-2"
              style={{ height: '150px' }}
            >
              <div className="">
                <h3 className="text-white">Blog</h3>
                <p className="text-white">Welcome to Blog</p>
              </div>
              <Link to="#" className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block">
                <i className="material-symbols-outlined me-1">lightbulb</i>Create Blog
              </Link>
            </div>
          </Col>
          <ListCard />
        </Container>
      </div>
    </>
  );
};
