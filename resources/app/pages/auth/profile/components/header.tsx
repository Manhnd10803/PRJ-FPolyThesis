import { Link } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import React, { useEffect, useRef, useState } from 'react';
import { FriendService } from '@/apis/services/friend.service';
import { Button, Card, Col, Dropdown, ListGroup, Modal } from 'react-bootstrap';
import backgroundImage from '../../../../assets/images/profile-bg1.jpg';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { ProfileService } from '@/apis/services/profile.service';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IProfileUser } from '@/models/user';
import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { formatFullName } from '@/utilities/functions';
import { DropZoneField } from '@/components/custom/drop-zone-field';
import { CustomListItem } from '@/utilities/funcReport/listItem';
import { CustomModal } from '@/utilities/funcReport/modalReport';
import { ReportService } from '@/apis/services/report.service';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
const imageUrl = 'https://picsum.photos/20';

type Props = {
  detailUser: IProfileUser;
  isLoading: boolean;
  isUser: boolean;
  idUser: number;
  queryKey: Array<string>;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const Header = ({ detailUser, isLoading, isUser, queryKey, idUser }: Props) => {
  const [modalShowUploadImage, setModalShowUplodaImage] = React.useState(false);
  const [modalShowResizeImage, setModalShowResizeImage] = React.useState(false);
  const [modalShowNoti, setModalShowNoti] = React.useState(false);
  const { total_blog, total_post, total_friend, user } = detailUser || {};
  const [imageCoverPhoto, setImageCoverPhoto] = useState('');
  const [checkAddFriend, setCheckAddFriend] = useState('');
  const [showFriendDropdown, setShowFriendDropdown] = useState(false);
  const queryClient = useQueryClient();
  const [contentReport, setContentReport] = useState('');
  const imagesRef = useRef<File[]>([]);
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const handleCloseModalReport = () => setShowModalReport(false);
  const handleShowModalReport = () => setShowModalReport(true);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = (title: any) => {
    setModalTitle(title);
    setShowModal(true);
    handleCloseModalReport();
  };
  const listItems = [
    { title: 'Giả mạo người khác', onClick: () => handleShow('Giả mạo người khác') },
    { title: 'Tài khoản giả mạo', onClick: () => handleShow('Tài khoản giả mạo') },
    { title: 'Tên giả mạo', onClick: () => handleShow('Tên giả mạo') },
    { title: 'Đăng nội dung không khù hợp', onClick: () => handleShow('Đăng nội dung không khù hợp') },
    { title: 'Quấy rầy', onClick: () => handleShow('Quấy rầy') },
    { title: 'Vấn đề khác', onClick: () => handleShow('Vấn đề khác') },
  ];
  const handleChangeFiles = (files: File[]) => {
    imagesRef.current = files;
  };
  const handleContentChange = (event: any) => {
    const content = event.target.value;
    setContentReport(content);
  };
  const QueryKey = ['reportUser'];
  const createReportMutation = useMutation(ReportService.postReport, {
    onSettled: () => {
      queryClient.invalidateQueries(QueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const idUserStorage = StorageFunc.getUserId();
  const postReport = async (idfriend, title, idUserReport) => {
    try {
      setIsLoadingReport(true);
      const imageURL = await CloudiaryService.uploadImages(imagesRef.current, 'blog');
      const formData = {
        reporter_id: idUserStorage,
        reported_id: idfriend,
        report_title: title,
        report_content: contentReport,
        report_type: 'user',
        report_type_id: idUserReport,
        report_image: imageURL[0],
      };
      await createReportMutation.mutateAsync(formData);
      handleClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
              setModalShowNoti(true);
            } else {
              const base64String: string | null = event.target?.result as string;
              if (base64String) {
                setImageCoverPhoto(base64String);
                setModalShowUplodaImage(false);
                setModalShowResizeImage(true);
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
          <MuiButton className="w-100" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Tải ảnh lên
            <VisuallyHiddenInput
              type="file"
              name="avatar"
              onChange={handleImageUpload}
              accept="image/png, image/jpg, image/jpeg"
            />
          </MuiButton>
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
            style={{ width: '100%' }}
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

  const updateCoverPhotoMutation = useMutation(ProfileService.updateCoverPhoto);
  const handleSaveImage = async () => {
    setModalShowResizeImage(false);
    const canvas = imageCoverRef?.current?.getImage();
    const imageBase64 = canvas.toDataURL('image/jpeg'); // Chuyển canvas thành base64

    // Chuyển đổi base64 thành File
    const file = dataURLtoFile(imageBase64, 'my_cover_photo.jpg');

    const fileList = [file];
    const data = await CloudiaryService.uploadImages(fileList, 'cover');
    const dataForm = {
      cover_photo: data[0],
    };
    try {
      await updateCoverPhotoMutation.mutateAsync(dataForm);
      toast.success('Cập nhật ảnh bìa thành công');
      queryClient.invalidateQueries(queryKey);
      return;
    } catch (error) {
      toast.error('Cập nhật ảnh bìa thất bại');
      return;
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
  const getStatusFriend = async () => {
    try {
      const { data } = await FriendService.statusFriend(user?.id);
      return data; // Assuming isFriend is a boolean value
    } catch (error) {
      console.error(error);
      return false; // Set to false in case of an error
    }
  };

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
      <UploadImage show={modalShowUploadImage} onHide={() => setModalShowUplodaImage(false)} />
      <ResizeImage show={modalShowResizeImage} onHide={() => setModalShowResizeImage(false)} />
      <NotiModal show={modalShowNoti} onHide={() => setModalShowNoti(false)} />
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
                        <Link to="#" className="material-symbols-outlined cursor-pointer">
                          photo_camera
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
                          onClick={() => setModalShowUplodaImage(true)}
                        >
                          photo_camera
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img loading="lazy" src={user?.avatar} alt="profile-img1" className="avatar-130 img-fluid" />
                    </div>
                    <div className="profile-detail">
                      <h3>{formatFullName(user)}</h3>
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
                    <div className="d-flex gap-3">
                      <Link
                        to={`/chat/${user?.id}`}
                        target="_blank"
                        className="btn btn-primary d-flex align-items-center gap-1"
                      >
                        <span className="material-symbols-outlined">chat</span> Nhắn tin
                      </Link>
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
                        <div className="card-header-toolbar d-flex align-items-center justify-content-center">
                          <Dropdown show={showFriendDropdown} onToggle={setShowFriendDropdown}>
                            <Dropdown.Toggle
                              variant="secondary"
                              id="dropdown-friend"
                              className="d-flex align-items-center gap-1"
                            >
                              <span className="material-symbols-outlined">person_check</span>
                              Bạn bè
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => HandleUnFriend(user?.id)}>Hủy kết bạn</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      )}
                      <div className="card-header-toolbar d-flex align-items-center justify-content-center">
                        <Dropdown>
                          <Dropdown.Toggle
                            as="span"
                            className="material-symbols-outlined text-dark"
                            style={{ cursor: 'pointer' }}
                          >
                            more_vert
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu-right">
                            <Dropdown.Item
                              eventKey="five"
                              className="d-flex align-items-center"
                              onClick={handleShowModalReport}
                            >
                              <span className="material-symbols-outlined">report</span>Tìm hỗ trợ hoặc báo cáo
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* Modal  */}
                        <Modal centered show={showModalReport} onHide={handleCloseModalReport}>
                          <Modal.Header closeButton>
                            <Modal.Title>Báo cáo</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p className="py-2">
                              Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước
                              khi báo cáo.
                            </p>

                            <ListGroup>
                              {listItems.map((item, index) => (
                                <CustomListItem key={index} title={item.title} onClick={item.onClick} />
                              ))}
                            </ListGroup>
                          </Modal.Body>
                          <Modal.Footer></Modal.Footer>
                        </Modal>

                        {/* Modal item  */}
                        <CustomModal show={showModal} onHide={handleClose} title={modalTitle}>
                          <div className="mb-3">
                            <label htmlFor="fileInput" className="form-label">
                              Bạn có thể đính kèm hình ảnh (tối đa 1 ảnh)
                            </label>
                            <DropZoneField onChangeFiles={handleChangeFiles} maxFiles={1} accept={{ 'image/*': [] }} />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="commentTextarea" className="form-label">
                              Nhận xét (tối đa 225 kí tự)
                            </label>
                            <textarea
                              className="form-control"
                              id="commentTextarea"
                              name="contentReport"
                              onChange={handleContentChange}
                              cols="10"
                              rows="3"
                            ></textarea>
                          </div>
                          <Modal.Footer>
                            <button
                              className="btn btn-info"
                              onClick={() => postReport(idUser, modalTitle, idUser)}
                              disabled={isLoadingReport}
                            >
                              {isLoadingReport ? 'Đang báo cáo...' : 'Báo cáo'}
                            </button>
                          </Modal.Footer>
                        </CustomModal>
                      </div>
                    </div>
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
