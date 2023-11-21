import { Button, Modal, Nav, Row } from 'react-bootstrap';
import noImage from '@/assets/images/no-image.png';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';

export const Official = ({ AccountShow, DataUser, setFile, isLoading }: any) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [imageCoverPhoto, setImageCoverPhoto] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (DataUser.avatar) {
      if (typeof DataUser.avatar === 'string') {
        setImage(DataUser.avatar); // If it's a string (URL)
      } else if (DataUser.avatar instanceof File) {
        const imageUrl = URL.createObjectURL(DataUser.avatar);
        setImage(imageUrl);
      }
    }
  }, [DataUser.avatar]);

  const UploadImage = (props: any) => {
    const handleImageUpload = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          const image = new Image();
          image.onload = () => {
            const base64String: string | null = event.target?.result as string;
            if (base64String) {
              setImageCoverPhoto(base64String);
              setModalShow(false);
              setModalShow2(true);
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
          <Modal.Title id="contained-modal-title-vcenter">Cập nhật ảnh đại diện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            name="avatar"
            id="avatar"
            multiple
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <Nav fill variant="pills" className="stepwizard-row" id="nav-tab" role="tablist">
            <Nav.Link
              className="active done btn"
              id="bank-tab"
              data-toggle="tab"
              onClick={() => document.getElementById('avatar').click()}
            >
              <i className="material-symbols-outlined bg-soft-success text-success">photo_camera</i>
              <span>Tải ảnh lên</span>
            </Nav.Link>
          </Nav>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ResizeImage = (props: any) => {
    return (
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa ảnh ảnh đại diện</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <AvatarEditor
            ref={imageCoverRef}
            image={imageCoverPhoto}
            width={250}
            height={250}
            border={30}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={props.onHide}>
            Hủy
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

  const handleSaveImage = () => {
    const canvas = imageCoverRef?.current?.getImage();
    const imageBase64 = canvas.toDataURL('image/jpeg'); // Chuyển canvas thành base64

    // Chuyển đổi base64 thành File
    const file = dataURLtoFile(imageBase64, 'my_cover_photo.jpg');
    const fileList = [file];
    const selectedImage = file; // Chọn File cụ thể từ fileList
    console.log(selectedImage);

    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : noImage;
    setImage(imageUrl);
    setFile(fileList);
    setModalShow2(false);
  };

  return (
    <>
      <div className="form-card text-left">
        <UploadImage show={modalShow} onHide={() => setModalShow(false)} />
        <ResizeImage show={modalShow2} onHide={() => setModalShow2(false)} />
        <Row>
          <div className="col-12">
            <h3 className="mb-4">Avatar:</h3>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center my-2">
            {image && (
              <div className="image-container" style={{ position: 'relative' }}>
                <img src={image} alt="" className="avatar-130 rounded-circle" />
                <Link
                  to="#"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                  className="material-symbols-outlined cursor-pointer"
                  onClick={() => setModalShow(true)}
                >
                  photo_camera
                </Link>
              </div>
            )}
          </div>
        </Row>
      </div>

      <Button name="next" className="float-end" type="submit" disabled={isLoading}>
        {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
      </Button>
      <Button
        variant="dark"
        name="previous"
        className="previous action-button-previous float-end me-3"
        value="Previous"
        disabled={isLoading}
        onClick={() => AccountShow('Account')}
      >
        Quay lại
      </Button>
    </>
  );
};
