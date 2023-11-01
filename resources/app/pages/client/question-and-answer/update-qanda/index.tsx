import { Row, Col, Container, Form, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { QandACreateSchema, TQandACreateSchema } from '@/validation/zod/qanda';
import { IMajors } from '@/models/major';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';
import { QandAService } from '@/apis/services/qanda.service';
import { useEffect, useState } from 'react';

const imageUrl = 'https://picsum.photos/20';

export const UpdateQandA = ({ qAndAData }) => {
  const { id } = useParams();
  console.log(id);
  console.log(qAndAData);

  const { data } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getMajors(),
  });
  const majors = data?.data;
  // console.log(qAndAData);

  const navigate = useNavigate();

  const {
    register: updateAsk,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TQandACreateSchema>({
    resolver: zodResolver(QandACreateSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: TQandACreateSchema }) => {
      return QandAService.UpdateQandA(id, body);
    },
  });
  // console.log(qAndAData);
  const onSubmit = (data: TQandACreateSchema) => {
    console.log(data);
    if (!isLoading) {
      mutate(
        { id: id, body: data },
        {
          onError: error => {
            console.log(qAndAData.qa.id);
            // console.log(data);
            console.log(error);
          },
          onSuccess: () => {
            toast.success('Câu hỏi đã được cập nhật thành công');
            reset();
            navigate(`/quest/${qAndAData.qa.id}`);
          },
        },
      );
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        {/* ============== FORM UPDATE QUESTION ============== */}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="post-text ms-3 w-100 "
          data-bs-toggle="modal"
          data-bs-target="#post-modal"
        >
          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Tiêu đề
            </Form.Label>
            <Col sm="12">
              <Form.Control
                {...updateAsk('title')}
                type="text"
                id="title"
                placeholder="Viết tóm tắt câu hỏi của bạn..."
                defaultValue={qAndAData.qa.title}
              />
            </Col>
            <p className="text-danger">{errors?.title?.message}</p>
          </Row>

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="exampleFormControlSelect1">
              Chuyên ngành
            </Form.Label>
            <Col sm="12">
              <Form.Select
                {...updateAsk('majors_id')}
                aria-label="Default select example"
                className="form-select"
                id="exampleFormControlSelect1"
                defaultValue={qAndAData.qa.majors_id}
              >
                <option value="0">Chọn chuyên ngành liên quan đến câu hỏi ...</option>
                {majors?.map((item: IMajors) => (
                  <option value={item.id} key={item.id} selected={item.id === qAndAData.qa.majors_id}>
                    {item.majors_name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <p className="text-danger">{errors?.majors_id?.message}</p>
          </Row>

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Nội dung
            </Form.Label>
            <Col sm="12">
              <Form.Control
                as="textarea"
                className="textarea"
                id="content"
                {...updateAsk('content')}
                rows={5}
                placeholder="Nhập chi tiết thông tin câu hỏi của bạn ..."
                defaultValue={qAndAData.qa.content}
              />
            </Col>

            <p className="text-danger">{errors?.content?.message}</p>
          </Row>

          {/* <EditableTextArea /> */}

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              HashTags
            </Form.Label>
            <Col sm="12">
              <Form.Control
                type="text"
                id="hashtag"
                {...updateAsk('hashtag')}
                placeholder="Thêm thẻ vào câu hỏi của bạn, tối đa 5 thẻ ..."
                defaultValue={qAndAData.qa.hashtag}
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
            </div>
          </div>
          <button type="submit" className="btn btn-primary d-block w-100 mt-3">
            Cập nhật thông tin câu hỏi
          </button>
        </Form>
      </div>
    </>
  );
};
