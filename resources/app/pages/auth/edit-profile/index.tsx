import { z } from 'zod';
import { Card } from '@/components/custom';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Personal } from './components/personal';
import { Contact } from './components/contact';
import { Official } from './components/official';
import { TUserUpdateSchema } from '@/validation/zod/user';
import { MajorService } from '@/apis/services/major.service';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/apis/services/user.service';
import { Finish } from './components/finish';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
export const EditProfilePage = () => {
  const [show, AccountShow] = useState('A');
  const [validationErrors, setValidationErrors] = useState({});
  const [DataMajor, setDataMajor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DataUser, setUserData] = useState({});
  const [file, setFile] = useState('');
  const {
    register: update,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<TUserUpdateSchema>();

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
  const handleNextValidate = (page: any, fields: Record<string, any>, validate: any) => {
    try {
      const validData = validate.parse(fields);
      if (validData) {
        AccountShow(page);
        setValidationErrors({});
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorDetails = {};
        error.errors.forEach(err => {
          errorDetails[err.path[0]] = err.message;
        });
        setValidationErrors(errorDetails);
      }
    }
  };

  const onSubmit = async (data: TUserUpdateSchema) => {
    const imageURL = await CloudiaryService.uploadImages(file, 'avatar');

    const newData = {
      ...data,
      avatar: imageURL[0],
    };
    if (!isLoading) {
      mutate(
        { body: newData },
        {
          onError: error => {
            console.log(data);
            console.log(error);
          },
          onSuccess: () => {
            AccountShow('Image');
            toast.success('Cập nhật thành công');
          },
        },
      );
    }
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
                    <h4 className="card-title">Thông tin</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="3">
                      <ul id="top-tabbar-vertical" className="p-0">
                        <li
                          className={` ${show === '' ? 'active done' : ''} ${show === 'Account' ? 'active done' : ''} ${
                            show === 'Personal' ? 'active done' : ''
                          }  active step1`}
                          id="personal"
                        >
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-primary text-primary">lock_open</i>
                            <span>Thông tin </span>
                          </Link>
                        </li>
                        <li
                          id="contact"
                          className={` ${show === 'Account' ? 'active done' : ''} ${
                            show === 'Personal' ? 'active done' : ''
                          } ${show === 'Image' ? 'active done' : ''} step2`}
                        >
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-danger text-danger">person</i>
                            <span>Liên lạc</span>
                          </Link>
                        </li>
                        <li
                          id="official"
                          className={` ${show === 'Personal' ? 'active done' : ''} ${
                            show === 'Image' ? 'active done' : ''
                          } step3`}
                        >
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-success text-success">photo_camera</i>
                            <span>Ảnh đại diện</span>
                          </Link>
                        </li>
                        <li id="payment" className={` ${show === 'Image' ? 'active done' : ''} step4`}>
                          <Link to="#">
                            <i className="material-symbols-outlined bg-soft-warning text-warning">done</i>
                            <span>Hoàn thành</span>
                          </Link>
                        </li>
                      </ul>
                    </Col>
                    <Col md="9">
                      {loading ? (
                        <Spinner animation="border" variant="primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <>
                          <Form
                            id="form-wizard3"
                            className="text-start"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                          >
                            <fieldset className={`${show === 'A' ? 'd-block' : 'd-none'}`}>
                              <Personal
                                AccountShow={AccountShow}
                                DataUser={DataUser}
                                update={update}
                                handleNextValidate={handleNextValidate}
                                validationErrors={validationErrors}
                                DataMajor={DataMajor}
                                watch={watch}
                              />
                            </fieldset>
                            <fieldset className={`${show === 'Account' ? 'd-block' : 'd-none'}`}>
                              <Contact
                                AccountShow={AccountShow}
                                DataUser={DataUser}
                                update={update}
                                validationErrors={validationErrors}
                                handleNextValidate={handleNextValidate}
                                watch={watch}
                              />
                            </fieldset>
                            <fieldset className={`${show === 'Personal' ? 'd-block' : 'd-none'}`}>
                              <Official
                                AccountShow={AccountShow}
                                DataUser={DataUser}
                                update={update}
                                file={file}
                                setFile={setFile}
                                isLoading={isLoading}
                              />
                            </fieldset>
                            <fieldset className={`${show === 'Image' ? 'd-block' : 'd-none'}`}>
                              <Finish />
                            </fieldset>
                          </Form>
                        </>
                      )}
                    </Col>
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
