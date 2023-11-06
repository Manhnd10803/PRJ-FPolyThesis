import { Link } from 'react-router-dom';
import { CustomToggle, ShareOffCanvas } from '@/components/custom';
import { Card, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';

const imageUrl = 'https://picsum.photos/20';
import icon1 from '../../../../../../assets/images/icon/01.png';
import icon2 from '../../../../../../assets/images/icon/02.png';
import icon3 from '../../../../../../assets/images/icon/03.png';
import icon4 from '../../../../../../assets/images/icon/04.png';
import icon5 from '../../../../../../assets/images/icon/05.png';
import icon6 from '../../../../../../assets/images/icon/06.png';
import icon7 from '../../../../../../assets/images/icon/07.png';
import { formatTimeFromCreatedAt } from '../../../components/format-time';
export const PostItem = ({ data }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <div className="post-item">
            <div className="user-post-data pb-3">
              <div className="d-flex justify-content-between">
                <div className="me-3">
                  {data?.user?.avatar !== null ? (
                    <>
                      <img loading="lazy" className="rounded-circle  avatar-60" src={data?.user?.avatar} alt="" />
                    </>
                  ) : (
                    <img loading="lazy" className="rounded-circle  avatar-60" src={imageUrl} alt="" />
                  )}
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between flex-wrap">
                    <div>
                      <h5 className="mb-0 d-inline-block">
                        <Link to="#">{data?.user?.username}</Link>
                      </h5>
                      <p className="ms-1 mb-0 d-inline-block">{data?.post?.feeling}</p>
                      <p className="mb-0">{formatTimeFromCreatedAt(data?.post?.created_at)}</p>
                    </div>
                    <div className="card-post-toolbar">
                      <div className="card-header-toolbar d-flex align-items-center justify-content-center">
                        <Dropdown>
                          <Link to="#">
                            <Dropdown.Toggle as="span" className="material-symbols-outlined">
                              more_horiz
                            </Dropdown.Toggle>
                          </Link>
                          <Dropdown.Menu className="dropdown-menu-right">
                            <Dropdown.Item to="#">
                              <i className="ri-delete-bin-6-fill me-2"></i>Delete
                            </Dropdown.Item>
                            <Dropdown.Item to="#">
                              <i className="ri-pencil-fill me-2"></i>Edit
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="user-post">
              <p>{data?.post?.content}</p>
              {data?.post?.image !== null ? (
                <>
                  <Link to="#">
                    <img loading="lazy" src={data?.post?.image} alt="post" className="img-fluid w-100" />
                  </Link>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="comment-area mt-3">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="like-block position-relative d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="like-data">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle}>
                          <img loading="lazy" src={icon1} className="img-fluid" alt="" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className=" py-2">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2">
                            <img loading="lazy" src={icon1} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                            <img loading="lazy" src={icon2} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                            <img loading="lazy" src={icon3} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                            <img loading="lazy" src={icon4} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                            <img loading="lazy" src={icon5} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                            <img loading="lazy" src={icon6} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                          <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                            <img loading="lazy" src={icon7} className="img-fluid me-2" alt="" />
                          </OverlayTrigger>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="total-like-block ms-2 me-3">
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="post-option">
                          {data?.like_counts_by_emotion?.total_likes} Likes
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item to="#">Max Emum</Dropdown.Item>
                          <Dropdown.Item to="#">Bill Yerds</Dropdown.Item>
                          <Dropdown.Item to="#">Hap E. Birthday</Dropdown.Item>
                          <Dropdown.Item to="#">Tara Misu</Dropdown.Item>
                          <Dropdown.Item to="#">Midge Itz</Dropdown.Item>
                          <Dropdown.Item to="#">Sal Vidge</Dropdown.Item>
                          <Dropdown.Item to="#">Other</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="total-comment-block">{data?.total_comments} comment</div>
                </div>
                <ShareOffCanvas />
              </div>
              <hr />
              <ul className="post-comments p-0 m-0">
                <li className="mb-2">
                  <div className="d-flex flex-wrap">
                    <div className="user-img">
                      <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-35 rounded-circle img-fluid" />
                    </div>
                    <div className="comment-data-block ms-3">
                      <h6>Monty Carlo</h6>
                      <p className="mb-0">Lorem ipsum dolor sit amet</p>
                      <div className="d-flex flex-wrap align-items-center comment-activity">
                        <Link to="#">like</Link>
                        <Link to="#">reply</Link>
                        <Link to="#">translate</Link>
                        <span> 5 min </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <form className="comment-text d-flex align-items-center mt-3">
                <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                <div className="comment-attagement d-flex">
                  <Link to="#" className="material-symbols-outlined me-3 link">
                    insert_link
                  </Link>
                  <Link to="#" className="material-symbols-outlined  me-3">
                    sentiment_satisfied
                  </Link>
                  <Link to="#" className="material-symbols-outlined  me-3">
                    photo_camera
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
