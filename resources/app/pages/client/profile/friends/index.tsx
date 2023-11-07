import { FriendService } from '@/apis/services/friend.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ModalRequest } from './components/modal';
import { useState } from 'react';

export const FriendsMyUserPage = () => {
  const queryClient = useQueryClient();
  const [showDeleteFriend, setShowDeleteFriend] = useState(false);
  const fetchAllFriendMyUser = async () => {
    // const {user} = TokenService.getUser()
    const { data } = await FriendService.showAllFriendMyUser();
    const FriendRequestData = data;
    return FriendRequestData;
  };

  const FriendsMyUserQueryKey = ['friendmyuser'];
  const { data: friendsMyUser, isLoading } = useQuery(FriendsMyUserQueryKey, { queryFn: fetchAllFriendMyUser });
  const addFriendMutation = useMutation(FriendService.unFriend, {
    onSettled: () => {
      queryClient.invalidateQueries(FriendsMyUserQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const HandleAddFriend = async (id: any) => {
    try {
      const response = await addFriendMutation.mutateAsync(id);
      setShowDeleteFriend(false);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="all-friends">
        <Card>
          <Card.Body>
            <h2>Friends</h2>
            <div className="friend-list-tab mt-2">
              <Nav
                variant="pills"
                className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
              >
                <Nav.Item>
                  <Nav.Link href="#pill-all-friends" eventKey="all-friends">
                    All Friends
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#pill-recently-add" eventKey="recently-add">
                    Recently Added
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#pill-closefriends" eventKey="closefriends">
                    {' '}
                    Close friends
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#pill-home" eventKey="home-town">
                    {' '}
                    Home/Town
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#pill-following" eventKey="following">
                    Following
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="all-friends">
                  <Card.Body className="p-0">
                    <Row>
                      {isLoading ? (
                        <></>
                      ) : (
                        <>
                          {friendsMyUser && friendsMyUser.length > 0 ? (
                            friendsMyUser.map((itemfriend: any) => (
                              <div className="col-md-6 col-lg-6 mb-3" key={itemfriend.id}>
                                <div className="iq-friendlist-block">
                                  <div className="d-flex align-items-center justify-content-between p-3">
                                    <div className="d-flex align-items-center gap-4">
                                      <Link to="#" style={{ width: '137px' }}>
                                        <img
                                          loading="lazy"
                                          src={itemfriend?.friend?.avatar}
                                          alt="profile-img"
                                          className="img-fluid rounded-1"
                                        />
                                      </Link>
                                      <div className="friend-info">
                                        <h5>{itemfriend?.friend?.username}</h5>
                                        <p className="mb-0">15 friends</p>
                                      </div>
                                    </div>
                                    <div className=" d-flex align-items-center justify-content-center">
                                      <Button className="btn btn-primary" onClick={() => setShowDeleteFriend(true)}>
                                        Hủy kết bạn
                                      </Button>
                                      <ModalRequest
                                        show={showDeleteFriend}
                                        onHide={() => setShowDeleteFriend(false)}
                                        onConfirm={() => HandleAddFriend(itemfriend?.friend?.id)}
                                        title={`Bạn có chắc chắn muốn hủy kết bạn với ${itemfriend?.friend?.username}?`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <>
                              <p>Chưa có bạn bè</p>
                            </>
                          )}
                        </>
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
