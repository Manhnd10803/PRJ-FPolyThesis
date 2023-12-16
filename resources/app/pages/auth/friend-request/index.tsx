import { useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FriendService } from '@/apis/services/friend.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatFullName } from '@/utilities/functions';
import { pathName } from '@/routes/path-name';
import { useSetListFriend } from '@/hooks/useFriendQuery';
import { CardLoad } from '@/utilities/funcLoadFriend/CardLoad';
interface FriendStates {
  [key: string]: string;
}
interface ConfirmFriend {
  [key: string]: string;
}
export const FriendRequestPage = () => {
  const queryClient = useQueryClient();
  const { manuallySetListFriend, manuallySetListSuggestFriend, manuallySetListFriendPaginate } = useSetListFriend();
  const [addFriendStates, setAddFriendStates] = useState<FriendStates>({});
  const [confirmFriend, setConfirmFriend] = useState<ConfirmFriend>({});

  const fetchAllFriendRequest = async () => {
    const { data } = await FriendService.showAllFriendRequest();
    const FriendRequestData = data;
    return FriendRequestData;
  };
  const FriendsRequestQueryKey = ['friendrequest'];
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
      setConfirmFriend(prevStates => {
        const newState = { ...prevStates };
        newState[id] = newState[id] === 'Đã chấp nhận bạn bè' ? 'Xác nhận' : 'Đã chấp nhận bạn bè';
        return newState;
      });
      const { data } = await confirmFriendRequestMutation.mutateAsync(id);
      manuallySetListFriend('add', data);
      manuallySetListFriendPaginate('add', id);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const HandleDeleteFriendRequest = async (id: any) => {
    try {
      const { data } = await FriendService.deleteFriendRequest(id);
      manuallySetListFriend('add', data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // LIST_SUGGEST_FRIEND
  const fetchSuggestFriend = async () => {
    const { data } = await FriendService.getSuggestFriends();
    return data;
  };
  const FriendsSuggestQueryKey = ['suggestFriend'];
  const { data: friendSuggest, isLoading: isLoadingSuggestFriend } = useQuery({
    queryKey: FriendsSuggestQueryKey,
    queryFn: fetchSuggestFriend,
  });

  const HandleAddFriend = async (id: any) => {
    try {
      const response = await FriendService.addFriend(id);
      queryClient.invalidateQueries(FriendsSuggestQueryKey);
      console.log(response.data);
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
                      <CardLoad />
                      <CardLoad />
                    </Row>
                  ) : (
                    <Row>
                      {friendRequest && friendRequest.length > 0 ? (
                        <>
                          {friendRequest.map((itemFriend: any) => {
                            return (
                              <Col key={itemFriend.id} sm={3}>
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
                                      {confirmFriend[itemFriend.friend.id] === 'Đã chấp nhận bạn bè' ? (
                                        <div></div>
                                      ) : (
                                        <></>
                                      )}
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
                    </Row>
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
