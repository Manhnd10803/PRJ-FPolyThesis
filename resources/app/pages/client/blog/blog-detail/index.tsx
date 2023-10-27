import { Row, Container } from 'react-bootstrap';
import { Comments } from './components/comments';
import { FormComment } from './components/form-comment';
import { ContentBlogDetail } from './components/content-detail';

export const BlogDetailPage = () => {
  // const { data, isSuccess } = useQuery({
  //   queryKey: ['blog'],
  //   queryFn: () => BlogService.showAllBlog
  // })

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <>
              <ContentBlogDetail />
              <FormComment />
              <Comments />
            </>
          </Row>
        </Container>
      </div>
    </>
  );
};