import { FriendService } from '@/apis/services/friend.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { formatFullName } from '@/utilities/functions';
import { ModalRequest } from '../friend-request/components/modal';
import { pathName } from '@/routes/path-name';
export const FriendListPage = () => {
  const queryClient = useQueryClient();
  const [showDeleteFriend, setShowDeleteFriend] = useState(false);

  const idUser = StorageFunc.getUserId();

  const fetchAllFriendMyUser = async () => {
    const { data } = await FriendService.showAllFriendMyUser(idUser);
    return data;
  };
  const FriendsMyUserQueryKey = ['myfriend'];

  const { data: friendsMyUser, isLoading: isLoadingMyFriend } = useQuery(FriendsMyUserQueryKey, {
    queryFn: fetchAllFriendMyUser,
  });

  const unFriendMutation = useMutation(FriendService.unFriend, {
    onSettled: () => {
      queryClient.invalidateQueries(FriendsMyUserQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });

  console.log(friendsMyUser);

  const HandleUnFriend = async (id: any) => {
    try {
      const response = await unFriendMutation.mutateAsync(id);
      setShowDeleteFriend(false);
      return response;
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
                    <h4 className="card-title">Danh sách bạn bè</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  {isLoadingMyFriend ? (
                    <>
                      <Spinner animation="border" variant="primary" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </>
                  ) : (
                    <Row>
                      {friendsMyUser && friendsMyUser.length > 0 ? (
                        <>
                          {friendsMyUser.map((itemFriend: any) => {
                            return (
                              <Col key={itemFriend.id} sm={3}>
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
                                      src={itemFriend.friend.avatar}
                                      alt="ảnh đại diện"
                                    />
                                  </Link>
                                  <Card.Body>
                                    <Link to={`${pathName.PROFILE}/${itemFriend.id}`}>
                                      <Card.Title as="h5" className="card-title">
                                        {formatFullName(itemFriend.friend)}
                                      </Card.Title>
                                    </Link>
                                    <Card.Text className="card-text">@{itemFriend.friend.username}</Card.Text>
                                    <div className="d-flex flex-column gap-2 mt-2 mt-md-0">
                                      <Link
                                        to="#"
                                        onClick={() => setShowDeleteFriend(true)}
                                        className="btn btn-primary rounded confirm-btn"
                                      >
                                        Hủy bạn bè
                                      </Link>

                                      <ModalRequest
                                        show={showDeleteFriend}
                                        onHide={() => setShowDeleteFriend(false)}
                                        onConfirm={() => HandleUnFriend(itemFriend?.friend?.id)}
                                        title={`Bạn có chắc chắn muốn hủy kết bạn với ${itemFriend?.friend?.username}?`}
                                      />
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
