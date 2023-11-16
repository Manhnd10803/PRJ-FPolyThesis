import { Card } from '@/components/custom';
import { useState } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ModalRequest } from './components/modal';
import { FriendService } from '@/apis/services/friend.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
interface FriendStates {
  [key: string]: string;
}
export const FriendRequestPage = () => {
  const queryClient = useQueryClient();
  const [addFriendStates, setAddFriendStates] = useState<FriendStates>({});
  const [showDeleteRequest, setShowDeleteRequest] = useState(false);

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
      const response = await confirmFriendRequestMutation.mutateAsync(id);
      toast.success('Xác nhận thành công');
      return response;
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
      setShowDeleteRequest(false);
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
                    <>
                      {friendRequest && friendRequest.length > 0 ? (
                        <>
                          <ul className="request-list list-inline m-0 p-0">
                            {friendRequest.map((itemFriend: any) => {
                              return (
                                <li
                                  key={itemFriend.id}
                                  className="d-flex align-items-center  justify-content-between flex-wrap"
                                >
                                  <div className="user-img img-fluid flex-shrink-0">
                                    <img
                                      src={itemFriend.friend.avatar}
                                      alt="story-img"
                                      className="rounded-circle avatar-40"
                                    />
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <h6>{itemFriend.friend.username}</h6>
                                  </div>
                                  <div className="d-flex align-items-center mt-2 mt-md-0">
                                    <div className="confirm-click-btn">
                                      <Link
                                        to="#"
                                        onClick={() => HandleConfirmFriendRequest(itemFriend.friend.id)}
                                        className="me-3 btn btn-primary rounded confirm-btn"
                                      >
                                        Xác nhận
                                      </Link>
                                      <Link
                                        to="#"
                                        className="me-3 btn btn-primary rounded request-btn"
                                        style={{ display: 'none' }}
                                      >
                                        View All
                                      </Link>
                                    </div>
                                    <Link
                                      to="#"
                                      className="btn btn-secondary rounded"
                                      data-extra-toggle="delete"
                                      data-closest-elem=".item"
                                      onClick={() => setShowDeleteRequest(true)}
                                    >
                                      Xóa
                                    </Link>
                                    <ModalRequest
                                      show={showDeleteRequest}
                                      onHide={() => setShowDeleteRequest(false)}
                                      onConfirm={() => HandleDeleteFriendRequest(itemFriend.friend.id)}
                                      title="Bạn muốn xóa lời mời kết bạn?"
                                    />
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <Card.Body>Không có yêu cầu mới</Card.Body>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>

              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Gợi ý kết bạn</h4>
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
                        <ul className="request-list list-inline m-0 p-0">
                          {friendSuggest.map((itemFriend: any) => {
                            return (
                              <li
                                key={itemFriend.id}
                                className="d-flex align-items-center  justify-content-between flex-wrap"
                              >
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img src={itemFriend.avatar} alt="story-img" className="rounded-circle avatar-40" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>{itemFriend.username}</h6>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <div className="confirm-click-btn">
                                    <Link
                                      to="#"
                                      onClick={() => HandleAddFriend(itemFriend.id)}
                                      className={`me-3 btn ${
                                        addFriendStates[itemFriend.id] === 'Hủy lời mời'
                                          ? 'btn-secondary'
                                          : 'btn-primary'
                                      } rounded confirm-btn`}
                                    >
                                      {addFriendStates[itemFriend.id] || 'Thêm bạn bè'}
                                    </Link>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
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
