import { FriendService } from '@/apis/services/friend.service';
import { CustomToggle } from '@/components/custom';
import { useSetListFriend } from '@/hooks/useFriendQuery';
import { ConfirmFriend, RequestFriend } from '@/models/friend';
import { pathName } from '@/routes/path-name';
import { formatFullName } from '@/utilities/functions';
import { Skeleton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Card, Dropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const FriendRequest = () => {
  const queryClient = useQueryClient();
  const [confirmFriend, setConfirmFriend] = useState<ConfirmFriend>({});
  const { manuallySetListFriend, manuallySetListFriendPaginate } = useSetListFriend();
  const [deleteRequestFriend, setdeleteRequestFriend] = useState<RequestFriend>({});

  const fetchAllFriendRequest = async () => {
    const { data } = await FriendService.showAllFriendRequest(5);
    return data.data;
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
  const deleteFriendRequestMutation = useMutation(FriendService.deleteFriendRequest, {
    onSettled: () => {
      queryClient.invalidateQueries(FriendsRequestQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const HandleDeleteFriendRequest = async (id: any) => {
    try {
      setdeleteRequestFriend(prevStates => {
        const newState = { ...prevStates };
        newState[id] = 'Gỡ lời mời';
        return newState;
      });
      const response = await deleteFriendRequestMutation.mutateAsync(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const HandleConfirmFriendRequest = async (id: any) => {
    try {
      setConfirmFriend(prevStates => {
        const newState = { ...prevStates };
        newState[id] = 'Đã chấp nhận bạn bè';
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
            <small className="badge bg-white text-primary ">{friendRequest?.length}</small>
          </Card.Header>
          <Card.Body className="p-0">
            {isLoadingRequestFriend ? (
              <div className="iq-friend-request">
                <div className="iq-sub-card iq-sub-card-big d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Skeleton className="skeleton-color" variant="rectangular" width={40} height={40} />
                    <div className="ms-3">
                      <Skeleton className="skeleton-color" width={120} />
                      <Skeleton className="skeleton-color" width={70} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Skeleton className="skeleton-color" width={80} height={60} />
                    <Skeleton className="skeleton-color" width={80} height={60} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {friendRequest && friendRequest?.length > 0 ? (
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
                          </div>
                        </div>
                      );
                    })}
                    <div className="text-center">
                      <Link to={`${pathName.FRIEND_REQUEST}`} className=" btn text-primary">
                        Xem thêm
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-center">Không có yêu cầu mới</p>
                  </>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};
