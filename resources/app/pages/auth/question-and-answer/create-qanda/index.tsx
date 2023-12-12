import { Row, Col, Container, Form, Dropdown, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { QandACreateSchema, TQandACreateSchema } from '@/validation/zod/qanda';
import { IMajors } from '@/models/major';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';
import { QandAService } from '@/apis/services/qanda.service';
import { useRef, useState } from 'react';
import { SupperEditor } from '@/components/shared/editor';

import { $generateHtmlFromNodes } from '@lexical/html';
import { pathName } from '@/routes/path-name';

export const CreateQandA = () => {
  const navigate = useNavigate();

  const editorRef: any = useRef();

  const contentHtmlRef = useRef<string>();

  const queryClient = useQueryClient();

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
    editorRef.current.getEditorState().read(() => {
      contentHtmlRef.current = $generateHtmlFromNodes(editorRef.current, null);
    });

    data.content = JSON.stringify(contentHtmlRef.current);
    if (data.content == '"<p class=\\"PlaygroundEditorTheme__paragraph\\"><br></p>"' || data.content == '""') {
      return toast.error('Nội dung không được để trống');
    }
    if (!isLoading) {
      mutate(data, {
        onError: error => {
          console.log(error);
        },
        onSuccess: () => {
          toast.success('Câu hỏi đã được tạo thành công');
          queryClient.invalidateQueries(['qa']);
          navigate(pathName.QUESTS);
        },
      });
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
                    <h2 className="card-title">ĐẶT CÂU HỎI NGAY</h2>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    <Form.Group className="form-group">
                      <Form.Label>Tiêu đề</Form.Label>
                      <Form.Control
                        {...createAsk('title')}
                        type="text"
                        id="title"
                        placeholder="Viết tóm tắt câu hỏi của bạn..."
                      />
                      <p className="text-danger">{errors?.title?.message}</p>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Chuyên ngành</Form.Label>
                      <Form.Select
                        {...createAsk('majors_id')}
                        aria-label="Default select example"
                        className="form-select"
                        id="exampleFormControlSelect1"
                      >
                        <option value="0">Chọn chuyên ngành liên quan đến câu hỏi ...</option>
                        {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}
                      </Form.Select>
                      <p className="text-danger">{errors?.majors_id?.message}</p>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Nội dung</Form.Label>

                      <SupperEditor ref={editorRef} />

                      <p className="text-danger">{errors?.content?.message}</p>
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>HashTag</Form.Label>
                      <Form.Control
                        type="text"
                        id="hashtag"
                        {...createAsk('hashtag')}
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
                        {isLoading ? 'Đang đặt câu hỏi...' : 'Đặt câu hỏi'}
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
