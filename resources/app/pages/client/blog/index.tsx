import { Container, Col, Spinner } from 'react-bootstrap';
import { ListCard } from './components/list-card';
import { Link } from 'react-router-dom';
import { BlogService } from '@/apis/services/blog.service';
import { useQuery } from '@tanstack/react-query';

export const BlogPage = () => {
  const fetchBlogs = async () => {
    const { data } = await BlogService.showAllBlog();
    const blogData = data;
    return blogData;
  };
  const { data, isLoading } = useQuery(['blogs'], () => fetchBlogs());
  console.log(data);

  return (
    <>
      <div id="content-page" className="content-page">
        {isLoading ? (
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
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
                  <Link to="/blog-create" className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block">
                    <i className="material-symbols-outlined me-1">lightbulb</i>Create Blog
                  </Link>
                </div>
              </Col>
              <ListCard data={data} />
            </Container>
          </>
        )}
      </div>
    </>
  );
};
