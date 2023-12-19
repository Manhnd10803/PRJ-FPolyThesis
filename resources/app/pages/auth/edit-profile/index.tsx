import { Card } from '@/components/custom';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Modal, Nav, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TUserUpdateSchema, ValidateUserUpdateSchema } from '@/validation/zod/user';
import { MajorService } from '@/apis/services/major.service';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/apis/services/user.service';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
import AvatarEditor from 'react-avatar-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@/components/shared/loading';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
export const EditProfilePage = () => {
  const [DataMajor, setDataMajor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DataUser, setUserData] = useState<TUserUpdateSchema>({});
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [imageCoverPhoto, setImageCoverPhoto] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const {
    register: update,
    formState: { errors },
    handleSubmit,
  } = useForm<TUserUpdateSchema>({
    resolver: zodResolver(ValidateUserUpdateSchema),
  });

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
              onClick={() => document.getElementById('avatar')?.click()}
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

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ body }: { body: TUserUpdateSchema }) => {
      return UserService.editInfoUser(body);
    },
  });
  // Info user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: DataInfoUser } = await UserService.showInfoUser();
        const { data: DataMajorUser } = await MajorService.getMajors();
        if (DataMajorUser) {
          setDataMajor(DataMajorUser);
        }
        if (DataInfoUser) {
          setUserData(DataInfoUser.user);
        }
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchUserData();
    return () => {};
  }, []);
  // HandeValidate

  const onSubmit = async (data: TUserUpdateSchema) => {
    const imageURL = await CloudiaryService.uploadImages(file, 'avatar');
    StorageFunc.setAvatarUser(imageURL[0]);
    const newData = {
      ...data,
      avatar: imageURL[0],
    };

    mutate(
      { body: newData },
      {
        onError: error => {
          console.error(error);
        },
        onSuccess: () => {
          toast.success('Cập nhật thành công');
        },
      },
    );
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12" lg="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Chỉnh sửa thông tin</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    {loading ? (
                      <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Đợi chút nè..." />
                    ) : (
                      <>
                        <Form
                          id="form-wizard3"
                          className="text-start row"
                          onSubmit={handleSubmit(onSubmit)}
                          encType="multipart/form-data"
                        >
                          <Col md="6">
                            <Form.Group className="form-group">
                              <Form.Label>Tên: </Form.Label>
                              <Form.Control
                                type="text"
                                name="first_name"
                                defaultValue={DataUser?.first_name || ''}
                                placeholder="Tên của bạn"
                                {...update('first_name')}
                              />

                              <div className="error-message text-danger">{errors.first_name?.message}</div>
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label>Họ: </Form.Label>
                              <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Họ của bạn"
                                defaultValue={DataUser?.last_name}
                                {...update('last_name')}
                              />
                              <div className="error-message text-danger">{errors.last_name?.message}</div>
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label>Username: </Form.Label>
                              <Form.Control
                                type="text"
                                name="username"
                                placeholder="User Name"
                                defaultValue={DataUser?.username || ''}
                                disabled
                              />
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label>Email: </Form.Label>
                              <Form.Control type="text" defaultValue={DataUser?.email || ''} disabled />
                              <div className="error-message text-danger">{errors.major_id?.message}</div>
                            </Form.Group>
                            <Form.Group className="form-group">
                              <Form.Label>Số điện thoại: </Form.Label>
                              <Form.Control
                                type="text"
                                id="ccno"
                                name="phone"
                                placeholder="Số điện thoại"
                                defaultValue={DataUser?.phone || ''}
                                {...update('phone')}
                              />
                              <div className="error-message text-danger">{errors.phone?.message}</div>
                            </Form.Group>
                            <Form.Label className="form-label" htmlFor="validationDefault041">
                              Chuyên ngành
                            </Form.Label>
                            <Form.Select
                              id="validationDefault041"
                              name="major_id"
                              {...update('major_id')}
                              defaultValue={DataUser?.major_id || ''}
                            >
                              <option value="">Choose...</option>
                              {DataMajor &&
                                Array.isArray(DataMajor) &&
                                DataMajor.map((major: any) => (
                                  <option key={major.id} value={major.id}>
                                    {major.majors_name}
                                  </option>
                                ))}
                            </Form.Select>
                            <div className="error-message text-danger">{errors.major_id?.message}</div>

                            <Form.Group className="form-group mt-4">
                              <Form.Label>Giới tính: </Form.Label>
                              <Form.Check className="form-check">
                                <Form.Check className="form-check form-check-inline">
                                  <Form.Check.Input
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    value="Nam"
                                    {...update('gender')}
                                    defaultChecked={DataUser?.gender === 'Nam'}
                                  />
                                  <Form.Check.Label> Nam</Form.Check.Label>
                                </Form.Check>
                                <Form.Check className="form-check form-check-inline">
                                  <Form.Check.Input
                                    type="radio"
                                    className="form-check-input"
                                    name="gender"
                                    {...update('gender')}
                                    value="Nữ"
                                    defaultChecked={DataUser?.gender === 'Nữ'}
                                  />
                                  <Form.Check.Label> Nữ</Form.Check.Label>
                                </Form.Check>
                              </Form.Check>
                              <div className="error-message text-danger">{errors.gender?.message}</div>
                            </Form.Group>

                            <Form.Group className="form-group">
                              <Form.Label>Ngày sinh: </Form.Label>
                              <Form.Control
                                type="date"
                                name="birthday"
                                defaultValue={DataUser?.birthday || ''}
                                {...update('birthday')}
                              />
                              <div className="error-message text-danger">{errors.birthday?.message}</div>
                            </Form.Group>

                            <Form.Group className="form-group">
                              <Form.Label>Bio: </Form.Label>
                              <Form.Control
                                as="textarea"
                                name="biography"
                                defaultValue={DataUser?.biography || ''}
                                {...update('biography')}
                              />
                              <div className="error-message text-danger">{errors.biography?.message}</div>
                            </Form.Group>
                            <Form.Group className="col-md-12 form-group mb-3 ">
                              <Form.Label>Địa chỉ: </Form.Label>
                              <Form.Control
                                as="textarea"
                                name="address"
                                id="address"
                                rows="5"
                                defaultValue={DataUser?.address || ''}
                                {...update('address')}
                              ></Form.Control>
                              <div className="error-message text-danger">{errors.address?.message}</div>
                            </Form.Group>
                            <Button name="next" className="float-right" type="submit" disabled={isLoading}>
                              {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                            </Button>
                          </Col>
                          <Col md="6" className="order-first order-lg-last">
                            <div className="form-card text-left">
                              <UploadImage show={modalShow} onHide={() => setModalShow(false)} />
                              <ResizeImage show={modalShow2} onHide={() => setModalShow2(false)} />

                              <Row>
                                <div className="d-flex justify-content-center my-2">
                                  {image && (
                                    <div className="image-container" style={{ position: 'relative' }}>
                                      <img
                                        src={image}
                                        alt=""
                                        className="rounded-circle"
                                        style={{ maxWidth: '200px', width: '100%' }}
                                      />
                                      <Link
                                        to="#"
                                        style={{
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)',
                                        }}
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
                          </Col>
                        </Form>
                      </>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
