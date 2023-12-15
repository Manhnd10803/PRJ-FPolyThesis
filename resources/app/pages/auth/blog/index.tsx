import { useCallback, useEffect, useState } from 'react';
import { Container, Col, Form, Row } from 'react-bootstrap';
import { ListCard } from './components/list-card';
import { Link } from 'react-router-dom';
import { BlogService } from '@/apis/services/blog.service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { pathName } from '@/routes/path-name';
import { Loading } from '@/components/shared/loading';
import { MajorService } from '@/apis/services/major.service';
import { IMajors } from '@/models/major';
import { Skeleton } from '@mui/material';

export const BlogPage = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [selectedMajor, setSelectedMajor] = useState('');

  const fetchBlogs = async ({ pageParam = 1 }) => {
    try {
      const { data } = await BlogService.showAllBlog(pageParam, selectedMajor);
      setTotalPage(data?.pagination.total_pages);
      return data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  };

  const handleMajorChange = useCallback(newMajor => {
    setSelectedMajor(newMajor === '' ? '' : newMajor);
  }, []);

  const queryKey = ['blogs', selectedMajor];
  const { isLoading, data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(queryKey, fetchBlogs, {
    getNextPageParam: (lastPage, pages) => lastPage.pagination.current_page + 1,
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
  }, [isFetching, hasNextPage, selectedMajor]);

  const { data: majors, isLoading: isMajorLoading } = useQuery({
    queryKey: ['majorsearch'],
    queryFn: () => MajorService.getMajors(),
  });
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Col sm={12}>
            <div
              className="bg-primary d-flex justify-content-between align-items-center flex-flex-wrap-reverse px-3 mb-3 rounded-2"
              style={{ height: '150px' }}
            >
              <div className="">
                <h3 className="text-white fw-bold">BLOG</h3>
              </div>
              <div className="w-50">
                <Form.Group className="form-group mb-0">
                  <select
                    className="form-select form-select-ml"
                    data-trigger
                    name="choices-single-default"
                    id="choices-single-default"
                    onChange={e => {
                      const newMajor = e.target.value;
                      handleMajorChange(newMajor);
                      // Manually refetch the data with the updated major
                    }}
                  >
                    <option value="">Tất cả chuyên ngành</option>
                    {isMajorLoading ? (
                      <option value="0">Đang tải...</option>
                    ) : (
                      <>
                        {majors?.data.map((item: IMajors) => (
                          <option key={item.id} value={item.id}>
                            {item.majors_name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </Form.Group>
              </div>
              <Link
                to={pathName.BLOG_CREATE}
                className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block fw-bold"
              >
                <i className="material-symbols-outlined me-1">lightbulb</i>TẠO BÀI VIẾT
              </Link>
            </div>
          </Col>
          {isLoading ? (
            // <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Đang tải..." />
            <Row>
              <Skeleton className="skeleton-color" style={{ width: '100%', height: '300px' }} />
            </Row>
          ) : (
            <>
              <ListCard data={data?.pages.flatMap(page => page.blogs)} />
              {isFetching ? (
                <Row>
                  <Skeleton className="skeleton-color" style={{ width: '100%', height: '300px' }} />
                </Row>
              ) : null}{' '}
            </>
          )}
        </Container>
      </div>
    </>
  );
};
