import { Container, Col } from 'react-bootstrap';
import { ListCard } from './components/list-card';
import { Link } from 'react-router-dom';
import { BlogService } from '@/apis/services/blog.service';
import { IBlogResponse } from '@/models/blog';
import { useQuery } from '@tanstack/react-query';

export const BlogPage = () => {
  const fetchBlogs = async (): Promise<IBlogResponse> => {
    const { data } = await BlogService.getBlogs();
    const blogData = data;
    return blogData;
  };
  const { data, isLoading } = useQuery<IBlogResponse>({ queryKey: ['blogs'], queryFn: fetchBlogs });

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
          <ListCard data={data || []} />
        </Container>
      </div>
    </>
  );
};
