import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';
import backgroundImage from '../../../../assets/images/profile-bg1.jpg';

export const Header = ({ detailUser, isLoading, friend_id }) => {
  const { total_blog, total_post, total_friend, user } = detailUser || [];
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
                        <img
                          loading="lazy"
                          src={`storage/${user?.avatar}`}
                          alt="profile-img1"
                          className="avatar-130 img-fluid"
                        />
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
                {friend_id ? (
                  <>
                    <div className="social-links">
                      <button className="btn btn-primary px-5">Kết bạn</button>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
