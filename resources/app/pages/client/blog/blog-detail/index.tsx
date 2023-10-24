import { Row, Col, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Comments } from './components/comments';
import { Card } from '@/components/custom';
import { FormComment } from './components/form-comment';
import { BlogService } from '@/apis/services/blog.service';
import { IBlogs } from '@/models/blog';
import { useQuery } from '@tanstack/react-query';
import { ContentBlogDetail } from './components/content-detail';

export const BlogDetailPage = () => {
  const location = useLocation();
  const id = location.state && location.state.id;

  const fetchBlogs = async (): Promise<IBlogs> => {
    const { data } = await BlogService.getBlogDetail(id);
    const blogData = data;
    return blogData;
  };
  const { data, isLoading } = useQuery<IBlogs>({ queryKey: ['blog'], queryFn: fetchBlogs });

  const postComment = async commentText => {
    // You will need to implement the logic to send the comment to your API
    // and handle the response. For example:
    // const response = await BlogService.postComment(id, commentText);
    // Handle the response, update state, etc.
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <ContentBlogDetail data={data} />
                <Comments data={data?.comments} />
                <FormComment postComment={postComment} />
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};
