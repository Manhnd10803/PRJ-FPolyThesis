import { Card } from '@/components/custom';
import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ModalRequest } from './components/modal';
import { FriendService } from '@/apis/services/friend.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const FriendRequestPage = () => {
  const queryClient = useQueryClient();
  const [showDeleteRequest, setShowDeleteRequest] = useState(false);
  const [showDeleteSuggest, setShowDeleteSuggest] = useState(false);

  const handleDeleteSuggest = () => {
    console.log('Đã xóa lời mời');
    setShowDeleteSuggest(false);
  };

  const fetchAllFriendRequest = async () => {
    const { data } = await FriendService.showAllFriendRequest();
    const FriendRequestData = data;
    return FriendRequestData;
  };
  const FriendsRequestQueryKey = ['friend'];
  const { data: friendRequest, isLoading } = useQuery(FriendsRequestQueryKey, { queryFn: fetchAllFriendRequest });
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
                  {isLoading ? (
                    // Nếu đang tải dữ liệu, hiển thị một thông báo hoặc spinner
                    <p>Đang tải dữ liệu...</p>
                  ) : (
                    <>
                      {friendRequest && friendRequest.length > 0 ? (
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
                      ) : (
                        <p>Không có yêu cầu mới</p>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
              {/* <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Gợi ý kết bạn</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="request-list m-0 p-0">
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <img
                          src={
                            'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8'
                          }
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Jen Youfelct</h6>
                        <p className="mb-0">4 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link to="#" className="me-3 btn btn-primary rounded">
                          <i className="ri-user-add-line me-1"></i>Thêm bạn bè
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                          onClick={() => setShowDeleteSuggest(true)}
                        >
                          Xóa, gỡ
                        </Link>
                        <ModalRequest
                          show={showDeleteSuggest}
                          onHide={() => setShowDeleteSuggest(false)}
                          onConfirm={handleDeleteSuggest}
                          title="Bạn muốn xóa gợi ý kết bạn?"
                        />
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
