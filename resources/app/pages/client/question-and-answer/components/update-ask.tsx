import { CustomToggle } from '@/components/custom';
import { Row, Col, Container, Form, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EditableTextArea from './form-textarea';
import toast from 'react-hot-toast';
import { QandACreateSchema, TQandACreateSchema } from '@/validation/zod/qanda';
import { IMajors } from '@/models/major';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';
import { QandAService } from '@/apis/services/qanda.service';
import { useState } from 'react';

const imageUrl = 'https://picsum.photos/20';

export const UpdateAsk = () => {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getMajors(),
  });

  const majors = data?.data;

  const {
    register: createAsk,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TQandACreateSchema>({
    resolver: zodResolver(QandACreateSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: TQandACreateSchema) => {
      return QandAService.createQandA(body);
    },
  });

  const onSubmit = (data: TQandACreateSchema) => {
    if (!isLoading) {
      mutate(data, {
        onError: error => {
          console.log(error);
        },
        onSuccess: () => {
          toast.success('Câu hỏi đã được tạo thành công');
          reset();
          navigate('/question-and-answer');
        },
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        {/* ============== FORM ADD QUESTION ============== */}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="post-text ms-3 w-100 "
          data-bs-toggle="modal"
          data-bs-target="#post-modal"
        >
          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Title
            </Form.Label>
            <Col sm="12">
              <Form.Control
                {...createAsk('title')}
                type="text"
                id="title"
                placeholder="Viết tóm tắt câu hỏi của bạn..."
              />
            </Col>
            <p className="text-danger">{errors?.title?.message}</p>
          </Row>

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="exampleFormControlSelect1">
              Majors
            </Form.Label>
            <Col sm="12">
              <Form.Select
                {...createAsk('majors_id')}
                aria-label="Default select example"
                className="form-select"
                id="exampleFormControlSelect1"
              >
                <option value="0">Chọn chuyên ngành</option>
                {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}
              </Form.Select>
            </Col>

            <p className="text-danger">{errors?.majors_id?.message}</p>
          </Row>

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Content
            </Form.Label>
            <Col sm="12">
              <Form.Control
                as="textarea"
                className="textarea"
                id="content"
                {...createAsk('content')}
                rows={5}
                placeholder="Let us know the problem you are having..."
              />
            </Col>

            <p className="text-danger">{errors?.content?.message}</p>
          </Row>

          {/* <EditableTextArea /> */}

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Tags
            </Form.Label>
            <Col sm="12">
              <Form.Control
                type="text"
                id="hashtag"
                {...createAsk('hashtag')}
                placeholder="Add up to 5 tags to describe what your question is about. Start typing to see suggestions..."
              />
            </Col>

            <p className="text-danger">{errors?.hashtag?.message}</p>
          </Row>
          <hr />
          <div className="other-option">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="user-img me-3">
                  <img src={imageUrl} alt="user1" className="avatar-60 rounded-circle img-fluid" />
                </div>
                <h6>Your Name</h6>
              </div>
              <div className="card-post-toolbar">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} role="button">
                    <span className="btn btn-primary">Public</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className=" m-0 p-0">
                    <Dropdown.Item className=" p-3" href="#">
                      <div className="d-flex align-items-top">
                        <i className="ri-save-line h4"></i>
                        <div className="data ms-2">
                          <h6>Public</h6>
                          <p className="mb-0">Everyone will know you.</p>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-3" href="#">
                      <div className="d-flex align-items-top">
                        <i className="ri-close-circle-line h4"></i>
                        <div className="data ms-2">
                          <h6>Anonymous Question</h6>
                          <p className="mb-0">Everyone will not know you.</p>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary d-block w-100 mt-3">
            Đăng câu hỏi
          </button>
        </Form>
      </div>

      {/* <hr /> */}
      <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
        {/* <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Photo
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> What is your major ?
          </div>
        </li> */}

        {/* <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Feeling/Activity
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Check in
          </div>
        </li> */}
      </ul>
    </>
  );
};
