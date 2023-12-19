import { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FriendService } from '@/apis/services/friend.service';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import { useSetListFriend } from '@/hooks/useFriendQuery';
import { CardLoad, CardLoadFriendRequest } from '@/utilities/funcLoadFriend/CardLoad';
import { ConfirmFriend, RequestFriend } from '@/models/friend';
import { useInView } from 'react-intersection-observer';

export const FriendRequestPage = () => {
  const queryClient = useQueryClient();
  const [isLoadingAddFriend, setIsLoadingAddFriend] = useState({});
  const { manuallySetListFriend } = useSetListFriend();
  const [confirmFriend, setConfirmFriend] = useState<ConfirmFriend>({});
  const [deleteRequestFriend, setdeleteRequestFriend] = useState<RequestFriend>({});
  const { ref: endRef, inView: endInView } = useInView();
  const fetchAllFriendRequest = async () => {
    const { data } = await FriendService.showAllFriendRequest();
    const FriendRequestData = data;
    return FriendRequestData;
  };
  const FriendsRequestQueryKey = ['friendrequest'];
  const queryKeyPaginate = ['ListFriendPaginate', true];
  const { data: friendRequest, isLoading: isLoadingRequestFriend } = useQuery(FriendsRequestQueryKey, {
    queryFn: fetchAllFriendRequest,
  });
  // Confirm friend
  const confirmFriendRequestMutation = useMutation(FriendService.confirmFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(FriendsRequestQueryKey);
      queryClient.invalidateQueries(queryKeyPaginate);
    },
  });
  const HandleConfirmFriendRequest = async (id: any) => {
    try {
      setConfirmFriend(prevStates => {
        const newState = { ...prevStates };
        newState[id] = 'Đã chấp nhận bạn bè';
        return newState;
      });
      const { data } = await confirmFriendRequestMutation.mutateAsync(id);
      manuallySetListFriend('add', data);

      return data;
    } catch (error) {
      throw error;
    }
  };
  const HandleDeleteFriendRequest = async (id: any) => {
    try {
      setdeleteRequestFriend(prevStates => {
        const newState = { ...prevStates };
        newState[id] = 'Gỡ lời mời';
        return newState;
      });
      const { data } = await FriendService.deleteFriendRequest(id);
      queryClient.invalidateQueries(FriendsRequestQueryKey);
      return data;
    } catch (error) {
      throw error;
    }
  };
  // LIST_SUGGEST_FRIEND
  const fetchSuggestFriend = async ({ pageParam = 1 }) => {
    const { data } = await FriendService.getSuggestFriends(8, pageParam);
    return data;
  };
  const FriendsSuggestQueryKey = ['suggestFriend'];
  const {
    data: friendSuggest,
    isLoading: isLoadingSuggestFriend,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(FriendsSuggestQueryKey, {
    queryFn: fetchSuggestFriend,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
    staleTime: 600000,
  });

  useEffect(() => {
    if (endInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [endInView, isFetching, hasNextPage, fetchNextPage]);

  const listFriendSuggest = friendSuggest?.pages.flatMap(page => page.data);

  const HandleAddFriend = async (id: any) => {
    try {
      setIsLoadingAddFriend(prevLoadingState => ({
        ...prevLoadingState,
        [id]: true,
      }));
      const response = await FriendService.addFriend(id);
      queryClient.invalidateQueries(FriendsSuggestQueryKey);
      setIsLoadingAddFriend(prevLoadingState => ({
        ...prevLoadingState,
        [id]: false,
      }));
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Lời mời kết bạn</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  {isLoadingRequestFriend ? (
                    <Row>
                      <CardLoadFriendRequest />
                      <CardLoadFriendRequest />
                      <CardLoadFriendRequest />
                      <CardLoadFriendRequest />
                    </Row>
                  ) : (
                    <Row>
                      {friendRequest && friendRequest.length > 0 ? (
                        <>
                          {friendRequest.map((itemFriend: any) => {
                            return (
                              <Col key={itemFriend.id} xl={3} lg={4} md={6} sm={12}>
                                <Card className="mb-3">
                                  <Link to={`${pathName.PROFILE}/${itemFriend.friend.id}`}>
                                    <Card.Img
                                      style={{
                                        width: '100%',
                                        aspectRatio: '4/3',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                      }}
                                      className="img-fluid"
                                      variant="top"
                                      src={itemFriend.friend.avatar}
                                      alt="ảnh đại diện"
                                    />
                                  </Link>
                                  <Card.Body>
                                    <Link to={`${pathName.PROFILE}/${itemFriend.friend.id}`}>
                                      <Card.Title as="h5" className="card-title">
                                        {formatFullName(itemFriend.friend)}
                                      </Card.Title>
                                    </Link>
                                    <Card.Text className="card-text">@{itemFriend.friend.username}</Card.Text>
                                    <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
                                      {deleteRequestFriend[itemFriend.friend.id] !== 'Gỡ lời mời' ? (
                                        <>
                                          <Link
                                            to="#"
                                            onClick={() => {
                                              if (confirmFriend[itemFriend.friend.id] !== 'Đã chấp nhận bạn bè') {
                                                HandleConfirmFriendRequest(itemFriend.friend.id);
                                              }
                                            }}
                                            className={`btn ${
                                              confirmFriend[itemFriend.friend.id] === 'Đã chấp nhận bạn bè'
                                                ? 'btn btn-soft-secondary'
                                                : 'btn btn-primary'
                                            } rounded confirm-btn`}
                                          >
                                            {confirmFriend[itemFriend.friend.id] || 'Xác nhận'}
                                          </Link>
                                          {confirmFriend[itemFriend.friend.id] !== 'Đã chấp nhận bạn bè' ? (
                                            <>
                                              <Link
                                                to="#"
                                                className="btn btn-soft-secondary rounded"
                                                data-extra-toggle="delete"
                                                data-closest-elem=".item"
                                                onClick={() => HandleDeleteFriendRequest(itemFriend.friend.id)}
                                              >
                                                Xóa, gỡ
                                              </Link>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <Link
                                            to="#"
                                            className="btn btn-soft-secondary rounded"
                                            data-extra-toggle="delete"
                                            data-closest-elem=".item"
                                          >
                                            Đã gỡ yêu cầu
                                          </Link>
                                        </>
                                      )}
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          })}
                        </>
                      ) : (
                        <Card.Body>Không có yêu cầu mới</Card.Body>
                      )}
                    </Row>
                  )}
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Những người bạn có thể biết</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  {isLoadingSuggestFriend ? (
                    <Row>
                      <CardLoad />
                      <CardLoad />
                      <CardLoad />
                      <CardLoad />
                    </Row>
                  ) : (
                    <>
                      {listFriendSuggest && listFriendSuggest.length > 0 ? (
                        <Row>
                          {listFriendSuggest.map((itemFriend: any) => {
                            return (
                              <Col key={itemFriend.id} xl={3} lg={4} md={6} sm={12}>
                                <Card className="mb-3">
                                  <Link to={`${pathName.PROFILE}/${itemFriend.id}`}>
                                    <Card.Img
                                      style={{
                                        width: '100%',
                                        aspectRatio: '4/3',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                      }}
                                      className="img-fluid"
                                      variant="top"
                                      src={itemFriend.avatar}
                                      alt="#"
                                    />
                                  </Link>
                                  <Card.Body>
                                    <Link to={`${pathName.PROFILE}/${itemFriend.id}`}>
                                      <Card.Title as="h5" className="card-title">
                                        {formatFullName(itemFriend)}
                                      </Card.Title>
                                    </Link>

                                    <Card.Text className="card-text">@{itemFriend.username}</Card.Text>
                                    <div className="d-flex flex-column  mt-2">
                                      <Link
                                        to="#"
                                        onClick={() =>
                                          !isLoadingAddFriend[itemFriend.id] && HandleAddFriend(itemFriend.id)
                                        }
                                        className={`btn ${
                                          itemFriend.friendship ? 'btn-soft-secondary' : 'btn-soft-primary'
                                        } rounded confirm-btn`}
                                      >
                                        {itemFriend.friendship ? 'Huỷ lời mời' : 'Thêm bạn bè'}
                                      </Link>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          })}
                          {isFetching && hasNextPage && listFriendSuggest && listFriendSuggest.length > 0 ? (
                            <CardLoad />
                          ) : null}
                        </Row>
                      ) : (
                        <p>Không có yêu cầu mới</p>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <div ref={endRef}></div>
          </Row>
        </Container>
      </div>
    </>
  );
};
