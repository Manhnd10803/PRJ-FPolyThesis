import { Card, Col, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';
import backgroundImage from '../../../../assets/images/profile-bg1.jpg';
import { FriendService } from '@/apis/services/friend.service';
import { useEffect, useState } from 'react';

export const Header = ({ detailUser, isLoading, isUser }) => {
  const { total_blog, total_post, total_friend, user } = detailUser || {};
  const [checkAddFriend, setCheckAddFriend] = useState('');
  const [showFriendDropdown, setShowFriendDropdown] = useState(false);

  const getStatusFriend = async () => {
    try {
      const { data } = await FriendService.statusFriend(user?.id);
      return data; // Assuming isFriend is a boolean value
    } catch (error) {
      console.error(error);
      return false; // Set to false in case of an error
    }
  };

  // Function to handle adding/removing a friend
  const HandleAddFriend = async (id: any) => {
    try {
      const response = await FriendService.addFriend(id);
      // Toggle the friend status and trigger a re-render
      console.log(response?.data.message);
      setCheckAddFriend(response?.data.message);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const HandleUnFriend = async (id: any) => {
    try {
      const response = await FriendService.unFriend(id);
      // Toggle the friend status and trigger a re-render
      setCheckAddFriend('Thêm bạn bè');
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch friend status when the component mounts
  useEffect(() => {
    if (!isUser && user?.id) {
      getStatusFriend().then(isFriend => {
        if (isFriend == 'Không phải bạn bè') {
          setCheckAddFriend('Thêm bạn bè');
        } else if (isFriend == 'Đã gửi lời mời kết bạn') {
          setCheckAddFriend('Đã gửi lời mời kết bạn');
        } else if (isFriend == 'Bạn bè') {
          setCheckAddFriend('Bạn bè');
        }
      });
    }
  }, [isUser, user]);

  return (
    <>
      <Col sm={12}>
        <Card>
          <Card.Body className=" profile-page p-0">
            <div className="profile-header">
              <div className="position-relative">
                <img loading="lazy" src={backgroundImage} alt="profile-bg" className="rounded img-fluid" />
                <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                  <li>
                    <Link to="#" className="material-symbols-outlined">
                      edit
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="material-symbols-outlined">
                      settings
                    </Link>
                  </li>
                </ul>
              </div>
              {isLoading ? (
                <>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img loading="lazy" src={imageUrl} alt="profile-img1" className="avatar-130 img-fluid" />
                    </div>
                    <div className="profile-detail">
                      <h3>.....</h3>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      {user?.avatar ? (
                        <img loading="lazy" src={user?.avatar} alt="profile-img1" className="avatar-130 img-fluid" />
                      ) : (
                        <img loading="lazy" src={imageUrl} alt="profile-img1" className="avatar-130 img-fluid" />
                      )}
                    </div>
                    <div className="profile-detail">
                      <h3>{user?.username}</h3>
                    </div>
                  </div>
                </>
              )}
              <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                <div className="social-info">
                  {isLoading ? (
                    <>
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">0</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Blogs</h6>
                          <p className="mb-0">0</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Friends</h6>
                          <p className="mb-0">0</p>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">{total_post}</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Blogs</h6>
                          <p className="mb-0">{total_blog}</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Friends</h6>
                          <p className="mb-0">{total_friend}</p>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
                <div className="social-links">
                  {isUser === false && (
                    <>
                      {checkAddFriend === 'Đã gửi lời mời kết bạn' ? (
                        <button className="btn btn-dark px-5" onClick={() => HandleAddFriend(user?.id)}>
                          Hủy lời mời
                        </button>
                      ) : (
                        (checkAddFriend === 'Thêm bạn bè' || checkAddFriend === 'Đã hủy lời mời kết bạn') && (
                          <button className="btn btn-primary px-5" onClick={() => HandleAddFriend(user?.id)}>
                            Thêm bạn bè
                          </button>
                        )
                      )}
                      {checkAddFriend === 'Bạn bè' && (
                        <div>
                          <Dropdown show={showFriendDropdown} onToggle={setShowFriendDropdown}>
                            <Dropdown.Toggle variant="primary" id="dropdown-friend">
                              Bạn bè
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => HandleUnFriend(user?.id)}>Hủy kết bạn</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
