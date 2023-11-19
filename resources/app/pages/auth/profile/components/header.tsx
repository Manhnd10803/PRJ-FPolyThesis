import { Link } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import React, { useEffect, useRef, useState } from 'react';
import { FriendService } from '@/apis/services/friend.service';
import { Button, Card, Col, Dropdown, Modal } from 'react-bootstrap';
import backgroundImage from '../../../../assets/images/profile-bg1.jpg';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { ProfileService } from '@/apis/services/profile.service';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { IProfileUser } from '@/models/user';

const imageUrl = 'https://picsum.photos/20';

type Props = {
  detailUser: IProfileUser;
  isLoading: boolean;
  isUser: boolean;
  queryKey: Array<string>;
};

export const Header = ({ detailUser, isLoading, isUser, queryKey }: Props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [modalShow3, setModalShow3] = React.useState(false);
  const { total_blog, total_post, total_friend, user } = detailUser || {};
  const [imageCoverPhoto, setImageCoverPhoto] = useState('');
  const [checkAddFriend, setCheckAddFriend] = useState('');
  const [showFriendDropdown, setShowFriendDropdown] = useState(false);
  const queryClient = useQueryClient();

  const NotiModal = (props: any) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Hãy chọn ảnh bìa khác</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ảnh bìa này quá nhỏ. Bạn hãy chọn ảnh lớn hơn.</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const UploadImage = (props: any) => {
    const handleImageUpload = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          const image = new Image();
          image.onload = () => {
            if (image.width < 1300) {
              setModalShow3(true);
            } else {
              const base64String: string | null = event.target?.result as string;
              if (base64String) {
                setImageCoverPhoto(base64String);
                setModalShow(false);
                setModalShow2(true);
              }
            }
          };
          image.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Cập nhật ảnh bìa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            name="avatar"
            id=""
            multiple
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleImageUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ResizeImage = (props: any) => {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa ảnh bìa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AvatarEditor
            ref={imageCoverRef}
            image={imageCoverPhoto}
            width={650}
            height={162.5}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={1}
            rotate={0}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={handleSaveImage}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const imageCoverRef = useRef(null);

  const dataURLtoFile = (dataurl: any, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSaveImage = async () => {
    const canvas = imageCoverRef?.current?.getImage();
    const imageBase64 = canvas.toDataURL('image/jpeg'); // Chuyển canvas thành base64

    // Chuyển đổi base64 thành File
    const file = dataURLtoFile(imageBase64, 'my_cover_photo.jpg');

    const fileList = [file];

    const data = await CloudiaryService.uploadImages(fileList, 'cover');
    const dataForm = {
      cover_photo: data[0],
    };
    await ProfileService.updateCoverPhoto(dataForm);
    toast.success('Cập nhật ảnh bìa thành công');
    setModalShow2(false);
    queryClient.invalidateQueries(queryKey);
  };

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
      <UploadImage show={modalShow} onHide={() => setModalShow(false)} />
      <ResizeImage show={modalShow2} onHide={() => setModalShow2(false)} />
      <NotiModal show={modalShow3} onHide={() => setModalShow3(false)} />
      <Col sm={12}>
        <Card>
          <Card.Body className=" profile-page p-0">
            <div className="profile-header">
              {isLoading ? (
                <>
                  <div className="position-relative">
                    <img loading="lazy" src={backgroundImage} alt="profile-bg" className="rounded img-fluid" />
                    <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                      <li>
                        <Link
                          to="#"
                          className="material-symbols-outlined cursor-pointer"
                          onClick={() => setModalShow(true)}
                        >
                          photo_camera
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="material-symbols-outlined">
                          settings
                        </Link>
                      </li>
                    </ul>
                  </div>
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
                  <div className="position-relative">
                    {user?.cover_photo ? (
                      <img loading="lazy" src={user?.cover_photo} alt="profile-bg" className="rounded img-fluid" />
                    ) : (
                      <img loading="lazy" src={backgroundImage} alt="profile-bg" className="rounded img-fluid" />
                    )}
                    <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                      <li>
                        <Link
                          to="#"
                          className="material-symbols-outlined cursor-pointer"
                          onClick={() => setModalShow(true)}
                        >
                          photo_camera
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="material-symbols-outlined">
                          settings
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img loading="lazy" src={user?.avatar} alt="profile-img1" className="avatar-130 img-fluid" />
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
