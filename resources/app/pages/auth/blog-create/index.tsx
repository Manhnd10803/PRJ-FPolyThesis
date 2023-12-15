import { Row, Col, Form, Modal, Nav, Button, Container, Card } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { TBlogCreateSchema, blogCreateSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BlogService } from '@/apis/services/blog.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MajorService } from '@/apis/services/major.service';
import { IMajors } from '@/models/major';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { pathName } from '@/routes/path-name';
import { useRef, useState } from 'react';
import { SupperEditor } from '@/components/shared/editor';
import AvatarEditor from 'react-avatar-editor';
import { $generateHtmlFromNodes } from '@lexical/html';
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

export const CreateBlogPage = () => {
  const editorRef: any = useRef();
  const contentHtmlRef = useRef<string>();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [imageCoverPhoto, setImageCoverPhoto] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();

  const { data, isLoading: isMajorLoading } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getMajors(),
  });
  const majors = data?.data;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TBlogCreateSchema>({
    resolver: zodResolver(blogCreateSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: TBlogCreateSchema) => {
      return BlogService.createBlog(body);
    },
  });

  const onSubmit = async (data: TBlogCreateSchema) => {
    editorRef.current.getEditorState().read(() => {
      contentHtmlRef.current = $generateHtmlFromNodes(editorRef.current, null);
    });

    if (!file) {
      return toast.error('Thumbnail không được để trống');
    }

    const contentEditor = JSON.stringify(contentHtmlRef.current);
    if (contentEditor == '"<p class=\\"PlaygroundEditorTheme__paragraph\\"><br></p>"' || contentEditor == '""') {
      return toast.error('Nội dung không được để trống');
    }
    const imageURL = await CloudiaryService.uploadImages(file, 'blog');
    const newData = {
      ...data,
      content: contentEditor,
      thumbnail: imageURL[0],
    };
    if (!isLoading) {
      mutate(newData, {
        onError: error => {
          console.log(error);
        },
        onSuccess: ({ data }) => {
          toast.success('Tạo blog thành công, hãy chờ duyệt');
          navigate(`${pathName.BLOG}/${data.id}`);
        },
      });
    }
  };

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
          <Modal.Title id="contained-modal-title-vcenter">Tải lên ảnh thumbnai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            id="thumbnail"
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
              onClick={() => document.getElementById('thumbnail').click()}
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
          <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa nhanh thumbnail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <AvatarEditor
            ref={imageCoverRef}
            image={imageCoverPhoto}
            width={413}
            height={232.31}
            border={30}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
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

    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : noImage;
    setImage(imageUrl);
    setFile(fileList);
    setModalShow2(false);
  };

  return (
    <div id="content-page" className="content-page">
      <UploadImage show={modalShow} onHide={() => setModalShow(false)} />
      <ResizeImage show={modalShow2} onHide={() => setModalShow2(false)} />
      <Container className="container">
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h2 className="card-title">Thêm mới blog</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <Form.Group className="form-group">
                    <Form.Label>Chuyên ngành:</Form.Label>
                    <Form.Select {...register('majors_id')} aria-label="Default select example">
                      <option value="0">Chọn chuyên ngành</option>
                      {isMajorLoading ? (
                        <option value="0">Đang tải...</option>
                      ) : (
                        <> {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}</>
                      )}
                    </Form.Select>
                    <p className="text-danger">{errors?.majors_id?.message}</p>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Tiêu đề:</Form.Label>
                    <Form.Control type="text" id="title" {...register('title')} />
                    <p className="text-danger">{errors?.title?.message}</p>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Thumbnail:</Form.Label>
                    {image && (
                      <div>
                        <img
                          id="previewImg"
                          src={image}
                          alt="Thumbnail Img"
                          className="mb-2"
                          style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                      </div>
                    )}
                    <div>
                      <MuiButton
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => setModalShow(true)}
                      >
                        Tải ảnh lên
                      </MuiButton>
                    </div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Hashtag:</Form.Label>
                    <Form.Control type="text" id="hashtag" {...register('hashtag')} />
                    <span className="text-danger">{errors?.hashtag?.message}</span>
                  </Form.Group>
                  <Form.Group className="mb-3 form-group">
                    <Form.Label>Nội dung:</Form.Label>
                    <SupperEditor ref={editorRef} />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      className={`d-block w-100 mt-3 ${isLoading ? 'disabled:bg-gray-500' : ''}`}
                      variant="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Đang gửi...' : 'Gửi'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
