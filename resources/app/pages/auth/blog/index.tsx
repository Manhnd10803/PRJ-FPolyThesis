import { Container, Col, Spinner } from 'react-bootstrap';
import { ListCard } from './components/list-card';
import { Link } from 'react-router-dom';
import { BlogService } from '@/apis/services/blog.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pathName } from '@/routes/path-name';
import { useEffect, useState } from 'react';

export const BlogPage = () => {
  const [totalPage, settotalPage] = useState(0);
  const fetchBlogs = async ({ pageParam = 1 }) => {
    const { data } = await BlogService.showAllBlog(pageParam);
    settotalPage(data?.pagination.total_pages);
    return data;
  };

  const { isLoading, data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(['colors'], fetchBlogs, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination.current_page + 1;
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (isAtBottom && !isFetching && totalPage > data?.pages.length) {
        fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, hasNextPage]);

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
              <Link
                to={pathName.BLOG_CREATE}
                className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block"
              >
                <i className="material-symbols-outlined me-1">lightbulb</i>Create Blog
              </Link>
            </div>
          </Col>
          {isLoading ? (
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              <ListCard data={data?.pages.flatMap(page => page.blogs)} />
              {isFetching ? <span> Loading...</span> : null}{' '}
            </>
          )}
        </Container>
      </div>
    </>
  );
};
