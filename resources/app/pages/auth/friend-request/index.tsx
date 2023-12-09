import { useState } from 'react';
import { Row, Col, Container, Spinner, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FriendService } from '@/apis/services/friend.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import { useSetListFriend } from '@/hooks/useFriendQuery';
interface FriendStates {
  [key: string]: string;
}
export const FriendRequestPage = () => {
  const queryClient = useQueryClient();
  const { manuallySetListFriend } = useSetListFriend();
  const [addFriendStates, setAddFriendStates] = useState<FriendStates>({});

  const fetchAllFriendRequest = async () => {
    const { data } = await FriendService.showAllFriendRequest();
    const FriendRequestData = data;
    return FriendRequestData;
  };
  const FriendsRequestQueryKey = ['friend'];
  const { data: friendRequest, isLoading: isLoadingRequestFriend } = useQuery(FriendsRequestQueryKey, {
    queryFn: fetchAllFriendRequest,
  });
  // Confirm friend
  const confirmFriendRequestMutation = useMutation(FriendService.confirmFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(FriendsRequestQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const HandleConfirmFriendRequest = async (id: any) => {
    try {
      const { data } = await confirmFriendRequestMutation.mutateAsync(id);
      manuallySetListFriend('add', data);
      toast.success('Xác nhận thành công');
      return data;
    } catch (error) {
      throw error;
    }
  };
  //Delete friend
  const deleteFriendRequestMutation = useMutation(FriendService.deleteFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(FriendsRequestQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const HandleDeleteFriendRequest = async (id: any) => {
    try {
      const response = await deleteFriendRequestMutation.mutateAsync(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // LIST_SUGGEST_FRIEND
  const fetchSuggestFriend = async () => {
    const { data } = await FriendService.getSuggestFriends();
    const FriendSuggestData = data;
    return FriendSuggestData;
  };
  const FriendsSuggestQueryKey = ['suggestFriend'];
  const { data: friendSuggest, isLoading: isLoadingSuggestFriend } = useQuery(FriendsSuggestQueryKey, {
    queryFn: fetchSuggestFriend,
  });

  const HandleAddFriend = async (id: any) => {
    try {
      await FriendService.addFriend(id);
      setAddFriendStates(prevStates => {
        const newState = { ...prevStates };
        newState[id] = newState[id] === 'Hủy lời mời' ? 'Thêm bạn bè' : 'Hủy lời mời';
        return newState;
      });
    } catch (error) {
      console.error(error);
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
                    <>
                      <Spinner animation="border" variant="primary" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </>
                  ) : (
                    <Row>
                      {friendRequest && friendRequest.length > 0 ? (
                        <>
                          {friendRequest.map((itemFriend: any) => {
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
                                        onClick={() => HandleConfirmFriendRequest(itemFriend.friend.id)}
                                        className="btn btn-primary rounded confirm-btn"
                                      >
                                        Xác nhận
                                      </Link>

                                      <Link
                                        to="#"
                                        className="btn btn-soft-secondary rounded"
                                        data-extra-toggle="delete"
                                        data-closest-elem=".item"
                                        onClick={() => HandleDeleteFriendRequest(itemFriend.friend.id)}
                                      >
                                        Xóa, gỡ
                                      </Link>
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
                    <>
                      <Spinner animation="border" variant="primary" role="status" size="sm">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </>
                  ) : (
                    <>
                      {friendSuggest && friendSuggest.length > 0 ? (
                        <Row>
                          {friendSuggest.map((itemFriend: any) => {
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
                                        onClick={() => HandleAddFriend(itemFriend.id)}
                                        className={`btn ${
                                          addFriendStates[itemFriend.id] === 'Hủy lời mời'
                                            ? 'btn btn-soft-secondary'
                                            : 'btn btn-soft-primary'
                                        } rounded confirm-btn`}
                                      >
                                        {addFriendStates[itemFriend.id] || 'Thêm bạn bè'}
                                      </Link>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          })}
                        </Row>
                      ) : (
                        <p>Không có yêu cầu mới</p>
                      )}
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
