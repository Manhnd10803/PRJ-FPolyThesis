import { CustomToggle } from '@/components/custom';
import { Row, Col, Container, Form, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { QandACreateSchema, TQandACreateSchema } from '@/validation/zod/qanda';
import { IMajors } from '@/models/major';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';
import { QandAService } from '@/apis/services/qanda.service';
import { useState } from 'react';

const imageUrl = 'https://picsum.photos/20';

export const CreateQandA = () => {
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
        {/* ============== FORM ĐẶT CÂU HỎI ============== */}
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
              Chuyên ngành
            </Form.Label>
            <Col sm="12">
              <Form.Select
                {...createAsk('majors_id')}
                aria-label="Default select example"
                className="form-select"
                id="exampleFormControlSelect1"
              >
                <option value="0">Chọn chuyên ngành liên quan đến câu hỏi ...</option>
                {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}
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
                {...createAsk('content')}
                rows={5}
                placeholder="Nhập chi tiết thông tin câu hỏi của bạn ..."
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
                {...createAsk('hashtag')}
                placeholder="Thêm thẻ vào câu hỏi của bạn, tối đa 5 thẻ ..."
              />
            </Col>

            <p className="text-danger">{errors?.hashtag?.message}</p>
          </Row>
          <hr />
          <div className="other-option">
            <div className="d-flex align-items-center justify-content-between">
              <button type="submit" className="btn btn-primary d-block w-100 mt-3 me-2 mx-2">
                Tạo câu hỏi
              </button>
              <button type="reset" className="btn btn-primary d-block w-50 mt-3 mx-2">
                Hủy
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
