import { Button, Modal } from 'react-bootstrap';
import MuiButton from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AvatarEditor from 'react-avatar-editor';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useShowAboutProfile } from '@/hooks/useShowAboutProfile';
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
export const UploadImage = (props: any) => {
  useShowAboutProfile(props.show, [props.show]);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        const image = new Image();
        image.onload = () => {
          const base64String: string | null = event.target?.result as string;
          if (props.title != 'Cập nhật ảnh đại diện') {
            if (image.width < 1300) {
              props.setModalShowNoti();
            } else {
              if (base64String) {
                props.setImageCoverPhoto(base64String);
                props.setModalShowUploadImage();
                props.setModalShowResizeImage();
              }
            }
          } else {
            if (base64String) {
              props.setImageCoverPhoto(base64String);
              props.setModalShowUploadImage();
              props.setModalShowResizeImage();
            }
          }
        };
        image.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
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

export const ResizeImage = (props: any) => {
  useShowAboutProfile(props.show, [props.show]);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <AvatarEditor
          ref={props.imageCoverRef}
          image={props.imageCoverPhoto}
          width={props.width}
          height={props.height}
          border={30}
          color={[255, 255, 255, 0.6]}
          scale={1}
          rotate={0}
          style={props.styleInfo}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={props.handleSaveImage}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};
