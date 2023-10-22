import { CustomToggle, ShareOffCanvas } from '@/components/custom';
import { Card, Col, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CommentList } from '../comment/comment-list';
import { CreateComment } from '../comment/create-comment';
import { CommentItemProps } from '../comment/comment-item';

//image
const imageUrl = 'https://picsum.photos/20';

type FeedItemProps = {
  avatar: string;
  content: string;
  authorName: string;
  createdAt: string;
  actionType: string;
  images: string[];
  commentList: CommentItemProps[];
};

export const FeedItem = ({
  avatar,
  content,
  authorName,
  createdAt,
  actionType,
  images,
  commentList,
}: FeedItemProps) => {
  return (
    <Col sm={12}>
      <Card className=" card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data">
            <div className="d-flex justify-content-between">
              <div className="me-3">
                <img className="rounded-circle img-fluid" src={avatar} alt="avatar" />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="mb-0 d-inline-block">{authorName}</h5>
                    <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
                    <p className="mb-0 text-primary">{createdAt}</p>
                  </div>
                  <div className="card-post-toolbar">
                    <Dropdown>
                      <Dropdown.Toggle variant="bg-transparent">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu m-0 p-0">
                        <Dropdown.Item className=" p-3" href="#">
                          <div className="d-flex align-items-top">
                            <div className="h4 material-symbols-outlined">
                              <i className="ri-save-line"></i>
                            </div>
                            <div className="data ms-2">
                              <h6>Save Post</h6>
                              <p className="mb-0">Add this to your saved items</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="p-3" href="#">
                          <div className="d-flex align-items-top">
                            <i className="ri-close-circle-line h4"></i>
                            <div className="data ms-2">
                              <h6>Hide Post</h6>
                              <p className="mb-0">See fewer posts like this.</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className=" p-3" href="#">
                          <div className="d-flex align-items-top">
                            <i className="ri-user-unfollow-line h4"></i>
                            <div className="data ms-2">
                              <h6>Unfollow User</h6>
                              <p className="mb-0">Stop seeing posts but stay friends.</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className=" p-3" href="#">
                          <div className="d-flex align-items-top">
                            <i className="ri-notification-line h4"></i>
                            <div className="data ms-2">
                              <h6>Notifications</h6>
                              <p className="mb-0">Turn on notifications for this post</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p>{content}</p>
          </div>
          <div className="user-post">
            <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
              {images.map((imageUrl: string, index: number) => (
                <div key={imageUrl} className="row-span-1">
                  <img src={imageUrl} alt={`post${index}`} className="img-fluid rounded w-100" />
                </div>
              ))}
            </div>
          </div>
          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="like-data">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle}>
                        <img src={imageUrl} className="img-fluid" alt="" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className=" py-2">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Like</Tooltip>} className="ms-2 me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                          <img src={imageUrl} className="img-fluid me-2" alt="" />
                        </OverlayTrigger>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="total-like-block ms-2 me-3">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="post-option">
                        140 Likes
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                        <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                        <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                        <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                        <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                        <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                        <Dropdown.Item href="#">Other</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="total-comment-block">
                  <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="post-option">
                      20 Comment
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                      <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                      <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                      <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                      <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                      <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                      <Dropdown.Item href="#">Other</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <ShareOffCanvas />
            </div>
            <hr />
            <CommentList commentList={commentList} />
            <CreateComment />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
