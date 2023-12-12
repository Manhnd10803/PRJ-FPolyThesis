import { MajorService } from '@/apis/services/major.service';
import { QandAService } from '@/apis/services/qanda.service';
import { IMajors } from '@/models/major';
import { pathName } from '@/routes/path-name';
import { QandACreateSchema, TQandACreateSchema } from '@/validation/zod/qanda';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col, Container, Form, Dropdown, Card, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateQandA = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState({});

  const {
    register: updateAsk,
    formState: { errors },
    handleSubmit,
  } = useForm<TQandACreateSchema>({
    resolver: zodResolver(QandACreateSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: TQandACreateSchema }) => {
      return QandAService.UpdateQandA(id, body);
    },
  });

  useEffect(() => {
    // Sử dụng id để lấy chi tiết dữ liệu từ API
    QandAService.getDetailQandA(id)
      .then(response => {
        setData(response.data);
        // console.log(data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy chi tiết:', error);
      });
  }, [id]);

  const { data: majors } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getMajors(),
  });
  const listMajors = majors?.data;
  console.log(listMajors);

  const onSubmit = (data: TQandACreateSchema) => {
    console.log(data);
    if (!isLoading) {
      mutate(
        { id: id, body: data },
        {
          onError: error => {
            console.log(id);
            // console.log(data);
            console.log(error);
          },
          onSuccess: () => {
            toast.success('Câu hỏi đã được cập nhật thành công');
            navigate(`/${pathName.QUESTS}/${id}`);
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
                    <h2 className="card-title">CẬP NHẬT CÂU HỎI NGAY</h2>
                  </div>
                </Card.Header>
                <Card.Body>
                  {/* {isEditing ? ( */}
                  <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <Form.Group className="form-group">
                      <Form.Label>Tiêu đề</Form.Label>
                      <Form.Control
                        {...updateAsk('title')}
                        type="text"
                        id="title"
                        defaultValue={data?.qa?.title}
                        placeholder="Viết tóm tắt câu hỏi của bạn..."
                      />
                      <p className="text-danger">{errors?.title?.message}</p>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Chuyên ngành</Form.Label>
                      <Form.Select
                        {...updateAsk('majors_id')}
                        aria-label="Default select example"
                        className="form-select"
                        id="exampleFormControlSelect1"
                      >
                        <option value={data?.qa?.majors_id}>Chọn chuyên ngành liên quan đến câu hỏi ...</option>
                        {listMajors?.map((item: IMajors) => (
                          <option value={item.id} key={item.id} selected={item.id === data?.qa?.majors_id}>
                            {item.majors_name}
                          </option>
                        ))}
                      </Form.Select>
                      <p className="text-danger">{errors?.majors_id?.message}</p>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>Nội dung</Form.Label>
                      <Form.Control
                        as="textarea"
                        className="textarea"
                        id="content"
                        {...updateAsk('content')}
                        rows={5}
                        defaultValue={data?.qa?.content}
                        placeholder="Nhập chi tiết thông tin câu hỏi của bạn ..."
                      />
                      <p className="text-danger">{errors?.content?.message}</p>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <Form.Label>HashTag</Form.Label>
                      <Form.Control
                        type="text"
                        id="hashtag"
                        {...updateAsk('hashtag')}
                        defaultValue={data?.qa?.hashtag}
                        placeholder="Thêm thẻ vào câu hỏi của bạn, tối đa 5 thẻ ..."
                      />
                      <p className="text-danger">{errors?.hashtag?.message}</p>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        className={`d-block w-100 mt-3 ${isLoading ? 'disabled:bg-gray-500' : ''}`}
                        variant="primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Đang lưu thông tin câu hỏi...' : 'Lưu thông tin câu hỏi'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
