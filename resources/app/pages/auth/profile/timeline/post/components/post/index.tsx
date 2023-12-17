import { GetNewPostResponseType } from '@/models/post';
import { pathName } from '@/routes/path-name';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { PostContextProvider } from '../../contexts';
import { PostItem } from './post-item';
import { Skeleton } from '@mui/material';
import { Card, Col } from 'react-bootstrap';

type PostContainerProps = {
  data: GetNewPostResponseType[];
  isLoading: boolean;
  isError: boolean | undefined;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: any;
};

export const PostContainer = ({
  data,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: PostContainerProps) => {
  const navigate = useNavigate();

  const { ref: endRefPost, inView: endInViewPost } = useInView();

  // func
  const handleShowDetail = (postItem: GetNewPostResponseType) => {
    navigate(`${pathName.POST}/${postItem.post.id}`, { state: { data: postItem } });
  };

  // effect
  useEffect(() => {
    if (endInViewPost && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInViewPost, isFetchingNextPage, hasNextPage, fetchNextPage]);

  // render
  if (isError) {
    return <span>Error...</span>;
  }

  if (isLoading)
    return (
      <Col sm={12}>
        <Card className=" card-block card-stretch card-height">
          <Card.Body>
            {/* Header */}
            <div className="user-post-data">
              <div className="d-flex justify-content-between">
                <div className="me-3">
                  <Skeleton className="skeleton-color" variant="circular" width={40} height={40} animation="wave" />
                </div>
                <div className="w-100">
                  <div>
                    <h5 className="mb-2 ">
                      <Skeleton
                        className="skeleton-color"
                        variant="rectangular"
                        width="50%"
                        height={15}
                        animation="wave"
                        style={{ borderRadius: '8px' }}
                      />
                    </h5>
                    <p className="mb-0 text-primary">
                      <Skeleton
                        className="skeleton-color"
                        variant="rectangular"
                        width="20%"
                        height={15}
                        animation="wave"
                        style={{ borderRadius: '8px' }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="my-3">
              <div className="mb-3">
                <Skeleton
                  className="skeleton-color"
                  variant="rectangular"
                  width="100%"
                  height={15}
                  animation="wave"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>
            {/* Image */}
            <div className="mb-3">
              <Skeleton
                className="skeleton-color"
                variant="rectangular"
                width="100%"
                height={400}
                animation="wave"
                style={{ borderRadius: '8px' }}
              />
            </div>
            {/*Footer*/}
            <div className="comment-area mt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <Skeleton className="skeleton-color" variant="text" width={80} />
                <Skeleton className="skeleton-color" variant="text" width={80} />
                <Skeleton className="skeleton-color" variant="text" width={80} />
              </div>
              <hr />
              {/* comment */}
              <ul className="post-comments list-inline p-0 m-0">
                <li className="mb-3">
                  <div className="d-flex">
                    <div className="user-img col-1">
                      <Skeleton className="skeleton-color" variant="circular" width={35} height={35} animation="wave" />
                    </div>
                    <div className="comment-data-block " style={{ width: '59vh' }}>
                      <div className="mb-2">
                        <Skeleton
                          className="skeleton-color"
                          variant="rectangular"
                          width="30%"
                          height={15}
                          animation="wave"
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <p>
                        <Skeleton
                          className="skeleton-color"
                          variant="rectangular"
                          width="100%"
                          height={15}
                          animation="wave"
                          style={{ borderRadius: '8px' }}
                        />
                      </p>
                      <div className="d-flex flex-wrap align-items-center comment-activity"></div>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex">
                    <div className="user-img col-1">
                      <Skeleton className="skeleton-color" variant="circular" width={35} height={35} animation="wave" />
                    </div>
                    <div className="comment-data-block " style={{ width: '59vh' }}>
                      <div className="mb-2">
                        <Skeleton
                          className="skeleton-color"
                          variant="rectangular"
                          width="30%"
                          height={15}
                          animation="wave"
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <p>
                        <Skeleton
                          className="skeleton-color"
                          variant="rectangular"
                          width="100%"
                          height={15}
                          animation="wave"
                          style={{ borderRadius: '8px' }}
                        />
                      </p>
                      <div className="d-flex flex-wrap align-items-center comment-activity"></div>
                    </div>
                  </div>
                </li>
                <li className="mb-3">
                  <div className="d-flex">
                    <div className="user-img col-1">
                      <Skeleton className="skeleton-color" variant="circular" width={35} height={35} animation="wave" />
                    </div>
                    <div className="comment-data-block " style={{ width: '59vh' }}>
                      <div className="mb-2">
                        <Skeleton
                          className="skeleton-color"
                          variant="rectangular"
                          width="30%"
                          height={15}
                          animation="wave"
                          style={{ borderRadius: '8px' }}
                        />
                      </div>
                      <p>
                        <Skeleton
                          className="skeleton-color"
                          variant="rectangular"
                          width="100%"
                          height={15}
                          animation="wave"
                          style={{ borderRadius: '8px' }}
                        />
                      </p>
                      <div className="d-flex flex-wrap align-items-center comment-activity"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  if (!data) return null;

  return (
    <>
      <PostContextProvider
        value={{
          postList: data,
          handleShowDetail,
        }}
      >
        <>
          {data.map(item => {
            return <PostItem key={item.post.id} item={item} />;
          })}
        </>
        {/*=========  loading more icon=========*/}

        {isFetchingNextPage ? (
          <div className="col-sm-12 text-center">
            <Col sm={12}>
              <Card className=" card-block card-stretch card-height">
                <Card.Body>
                  {/* Header */}
                  <div className="user-post-data">
                    <div className="d-flex justify-content-between">
                      <div className="me-3">
                        <Skeleton
                          className="skeleton-color"
                          variant="circular"
                          width={40}
                          height={40}
                          animation="wave"
                        />
                      </div>
                      <div className="w-100">
                        <div>
                          <h5 className="mb-2 ">
                            <Skeleton
                              className="skeleton-color"
                              variant="rectangular"
                              width="50%"
                              height={15}
                              animation="wave"
                              style={{ borderRadius: '8px' }}
                            />
                          </h5>
                          <p className="mb-0 text-primary">
                            <Skeleton
                              className="skeleton-color"
                              variant="rectangular"
                              width="20%"
                              height={15}
                              animation="wave"
                              style={{ borderRadius: '8px' }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="my-3">
                    <div className="mb-3">
                      <Skeleton
                        className="skeleton-color"
                        variant="rectangular"
                        width="100%"
                        height={15}
                        animation="wave"
                        style={{ borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                  {/* Image */}
                  <div className="mb-3">
                    <Skeleton
                      className="skeleton-color"
                      variant="rectangular"
                      width="100%"
                      height={400}
                      animation="wave"
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                  {/*Footer*/}
                  <div className="comment-area mt-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <Skeleton className="skeleton-color" variant="text" width={80} />
                      <Skeleton className="skeleton-color" variant="text" width={80} />
                      <Skeleton className="skeleton-color" variant="text" width={80} />
                    </div>
                    <hr />
                    {/* comment */}
                    <ul className="post-comments list-inline p-0 m-0">
                      <li className="mb-3">
                        <div className="d-flex">
                          <div className="user-img col-1">
                            <Skeleton
                              className="skeleton-color"
                              variant="circular"
                              width={35}
                              height={35}
                              animation="wave"
                            />
                          </div>
                          <div className="comment-data-block " style={{ width: '59vh' }}>
                            <div className="mb-2">
                              <Skeleton
                                className="skeleton-color"
                                variant="rectangular"
                                width="30%"
                                height={15}
                                animation="wave"
                                style={{ borderRadius: '8px' }}
                              />
                            </div>
                            <p>
                              <Skeleton
                                className="skeleton-color"
                                variant="rectangular"
                                width="100%"
                                height={15}
                                animation="wave"
                                style={{ borderRadius: '8px' }}
                              />
                            </p>
                            <div className="d-flex flex-wrap align-items-center comment-activity"></div>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex">
                          <div className="user-img col-1">
                            <Skeleton
                              className="skeleton-color"
                              variant="circular"
                              width={35}
                              height={35}
                              animation="wave"
                            />
                          </div>
                          <div className="comment-data-block " style={{ width: '59vh' }}>
                            <div className="mb-2">
                              <Skeleton
                                className="skeleton-color"
                                variant="rectangular"
                                width="30%"
                                height={15}
                                animation="wave"
                                style={{ borderRadius: '8px' }}
                              />
                            </div>
                            <p>
                              <Skeleton
                                className="skeleton-color"
                                variant="rectangular"
                                width="100%"
                                height={15}
                                animation="wave"
                                style={{ borderRadius: '8px' }}
                              />
                            </p>
                            <div className="d-flex flex-wrap align-items-center comment-activity"></div>
                          </div>
                        </div>
                      </li>
                      <li className="mb-3">
                        <div className="d-flex">
                          <div className="user-img col-1">
                            <Skeleton
                              className="skeleton-color"
                              variant="circular"
                              width={35}
                              height={35}
                              animation="wave"
                            />
                          </div>
                          <div className="comment-data-block " style={{ width: '59vh' }}>
                            <div className="mb-2">
                              <Skeleton
                                className="skeleton-color"
                                variant="rectangular"
                                width="30%"
                                height={15}
                                animation="wave"
                                style={{ borderRadius: '8px' }}
                              />
                            </div>
                            <p>
                              <Skeleton
                                className="skeleton-color"
                                variant="rectangular"
                                width="100%"
                                height={15}
                                animation="wave"
                                style={{ borderRadius: '8px' }}
                              />
                            </p>
                            <div className="d-flex flex-wrap align-items-center comment-activity"></div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </div>
        ) : (
          <div className="col-sm-12 text-center p-2 pb-4">
            <h4>Không còn bài viết cũ hơn</h4>
          </div>
        )}
        <div ref={endRefPost}></div>
      </PostContextProvider>
    </>
  );
};
