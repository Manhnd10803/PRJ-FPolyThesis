import { FriendService } from '@/apis/services/friend.service';
import { useInfiniteQuery, useMutatio, useMutation } from '@tanstack/react-query';
import { Button, Card, Col, Row, Tab } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { ModalRequest } from './components/modal';
import { useEffect, useState } from 'react';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import { useInView } from 'react-intersection-observer';
import { CardLoad } from '@/utilities/funcLoadFriend/CardLoad';
import { useSetListFriend } from '@/hooks/useFriendQuery';

export const FriendsMyUserPage = ({ isUser }) => {
  const [showDeleteFriendMap, setShowDeleteFriendMap] = useState({});
  const [canceledFriendIds, setCanceledFriendIds] = useState<string[]>([]);
  const { manuallySetListFriend, manuallySetListFriendPaginate } = useSetListFriend();
  const { ref: endRef, inView: endInView } = useInView();

  const { id } = useParams();
  const idUser = id !== undefined ? id : StorageFunc.getUserId();

  const fetchAllFriendMyUserPaginate = async ({ pageParam = 1 }) => {
    const { data } = await FriendService.showAllFriendMyUser(idUser, 8, pageParam);
    return data;
  };
  const FriendsMyUserQueryKey = ['ListFriendPaginate', isUser];

  const {
    data: friendsMyUser,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: FriendsMyUserQueryKey,
    queryFn: fetchAllFriendMyUserPaginate,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });
  useEffect(() => {
    if (endInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [endInView, isFetching, hasNextPage, fetchNextPage]);
  const listFriend = friendsMyUser?.pages.flatMap(page => page.data);
  const unFriendMutation = useMutation(FriendService.unFriend);
  const HandleUnFriend = async (id: any) => {
    try {
      setCanceledFriendIds(prevIds => [...prevIds, id]);
      setShowDeleteFriendMap(prevState => ({ ...prevState, [id]: false }));
      const response = await unFriendMutation.mutateAsync(id);
      manuallySetListFriend('delete', response.data);
      manuallySetListFriendPaginate('delete', id);
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="all-friends">
        <Card>
          <Card.Body>
            <h4>Bạn bè</h4>
            <div className="friend-list-tab mt-2">
              <Tab.Content>
                <Tab.Pane eventKey="all-friends">
                  <Card.Body className="p-0">
                    <Row>
                      {isLoading ? (
                        <>
                          <CardLoad />
                        </>
                      ) : (
                        <Row>
                          {listFriend && listFriend.length > 0 ? (
                            <>
                              {listFriend.map((itemFriend: any) => {
                                const isCanceled = canceledFriendIds.includes(itemFriend?.friend?.id);
                                return (
                                  <Col key={itemFriend.id} sm={3}>
                                    <Card className="mb-3">
                                      <Link to={`${pathName.PROFILE}/${itemFriend?.friend?.id}`}>
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
                                        <Link to={`${pathName.PROFILE}/${itemFriend?.friend?.id}`}>
                                          <Card.Title as="h5" className="card-title">
                                            {formatFullName(itemFriend.friend)}
                                          </Card.Title>
                                        </Link>
                                        <Card.Text className="card-text">@{itemFriend.friend.username}</Card.Text>
                                        {isUser ? (
                                          <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
                                            {isCanceled ? (
                                              <span className="btn btn-secondary rounded confirm-btn">Đã hủy</span>
                                            ) : (
                                              <>
                                                <Button
                                                  onClick={() =>
                                                    setShowDeleteFriendMap(prevState => ({
                                                      ...prevState,
                                                      [itemFriend?.friend?.id]: true,
                                                    }))
                                                  }
                                                  className="btn btn-primary rounded confirm-btn"
                                                >
                                                  Hủy bạn bè
                                                </Button>

                                                <ModalRequest
                                                  show={showDeleteFriendMap[itemFriend?.friend?.id]}
                                                  onHide={() =>
                                                    setShowDeleteFriendMap(prevState => ({
                                                      ...prevState,
                                                      [itemFriend?.friend?.id]: false,
                                                    }))
                                                  }
                                                  onConfirm={() => HandleUnFriend(itemFriend?.friend?.id)}
                                                  title={`Bạn có chắc chắn muốn hủy kết bạn với ${itemFriend?.friend?.username}?`}
                                                />
                                              </>
                                            )}
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                );
                              })}
                            </>
                          ) : (
                            <Card.Body>Chưa có bạn bè</Card.Body>
                          )}
                          {isFetching ? (
                            <span>
                              <CardLoad />
                            </span>
                          ) : null}
                          <div ref={endRef}></div>
                        </Row>
                      )}
                    </Row>
                  </Card.Body>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Card.Body>
        </Card>
      </Tab.Container>
    </>
  );
};
