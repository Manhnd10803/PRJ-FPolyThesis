import { FriendService } from '@/apis/services/friend.service';
import { CustomToggle } from '@/components/custom';
import { formatFullName } from '@/utilities/functions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, Dropdown, Image, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const FriendRequest = () => {
  const queryClient = useQueryClient();
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
  const HandleConfirmFriendRequest = async (id: any) => {
    try {
      const response = await confirmFriendRequestMutation.mutateAsync(id);
      toast.success('Xác nhận thành công');
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <Dropdown as="li" className="nav-item">
      <Dropdown.Toggle href="/" as={CustomToggle} variant="d-flex align-items-center">
        <span className="material-symbols-outlined">group</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="sub-drop sub-drop-large">
        <Card className="shadow-none m-0">
          <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title">
              <h5 className="mb-0 text-white">Lời mời kết bạn</h5>
            </div>
            <small className="badge  bg-light text-dark ">{friendRequest?.length}</small>
          </Card.Header>
          <Card.Body className="p-0">
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
                    {friendRequest.map((itemFriend: any) => {
                      return (
                        <div className="iq-friend-request" key={itemFriend.id}>
                          <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <Image
                                className="avatar-40 rounded"
                                src={itemFriend.friend.avatar}
                                alt=""
                                loading="lazy"
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 ">{formatFullName(itemFriend.friend)}</h6>
                                <p className="mb-0">@{itemFriend.friend.username}</p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-2">
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
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            <div className="text-center">
              <Link to="#" className=" btn text-primary">
                View More Request
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};
