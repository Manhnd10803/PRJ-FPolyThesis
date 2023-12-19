import { Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatFullName } from '@/utilities/functions';
import { ModalRequest } from '../friend-request/components/modal';
import { pathName } from '@/routes/path-name';
import { useFriendPaginate, useSetListFriend } from '@/hooks/useFriendQuery';
import { FriendService } from '@/apis/services/friend.service';
import { useMutation } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { CardLoad } from '@/utilities/funcLoadFriend/CardLoad';
export const FriendListPage = () => {
  const [showDeleteFriendMap, setShowDeleteFriendMap] = useState({});
  const [canceledFriendIds, setCanceledFriendIds] = useState<string[]>([]);
  const { manuallySetListFriend, manuallySetListFriendPaginate } = useSetListFriend();
  const { ref: endRef, inView: endInView } = useInView();

  const {
    data: friendsMyUser,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isLoading: isLoadingMyFriend,
  } = useFriendPaginate();

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
  console.log(listFriend);
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Danh sách bạn bè</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  {isLoadingMyFriend ? (
                    <Row>
                      <CardLoad />
                      <CardLoad />
                      <CardLoad />
                      <CardLoad />
                    </Row>
                  ) : (
                    <>
                      {listFriend && listFriend.length > 0 ? (
                        <Row>
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
                                      {/* ... other card content ... */}
                                      <Card.Title as="h5" className="card-title">
                                        {formatFullName(itemFriend.friend)}
                                      </Card.Title>
                                    </Link>
                                    <Card.Text className="card-text">@{itemFriend.friend.username}</Card.Text>
                                    <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
                                      {isCanceled ? (
                                        <span className="btn btn-secondary rounded confirm-btn">Đã hủy</span>
                                      ) : (
                                        <>
                                          <Link
                                            to="#"
                                            onClick={() =>
                                              setShowDeleteFriendMap(prevState => ({
                                                ...prevState,
                                                [itemFriend?.friend?.id]: true,
                                              }))
                                            }
                                            className="btn btn-primary rounded confirm-btn"
                                          >
                                            Hủy bạn bè
                                          </Link>

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
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          })}
                          {isFetching ? <CardLoad /> : null}
                        </Row>
                      ) : (
                        <Card.Body>Chưa có bạn bè</Card.Body>
                      )}

                      <div ref={endRef}></div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
