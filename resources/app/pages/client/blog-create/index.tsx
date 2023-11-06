import { Row, Col, Form, Button, Container, Card } from 'react-bootstrap';
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
import { useState } from 'react';
import { CloudiaryService } from '@/apis/services/cloudinary.service';

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
  const [files, setFiles] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const { data } = useQuery({
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
    const imageURL = await CloudiaryService.uploadImages(files, 'blog');
    const newData = {
      ...data,
      thumbnail: imageURL[0],
    };
    if (!isLoading) {
      mutate(newData, {
        onError: error => {
          console.log(error);
        },
        onSuccess: () => {
          toast.success('Tạo blog thành công');
          navigate('/blog');
        },
      });
    }
  };
  const handleChange = ({ currentTarget: { files } }: React.FormEvent<HTMLInputElement>) => {
    console.log('preparing files to upload', files);
    if (files && files.length) {
      setFiles(files);
    }
  };
  return (
    <div id="content-page" className="content-page">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h2 className="card-title">Create Blog</h2>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                  <Form.Group className="form-group">
                    <Form.Label>Chuyên ngành:</Form.Label>
                    <Form.Select {...register('majors_id')} aria-label="Default select example">
                      <option value="0">Chọn chuyên ngành</option>
                      {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)}
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
                    <div>
                      <MuiButton component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Tải lên tệp
                        <VisuallyHiddenInput
                          type="file"
                          id="thumbnail"
                          onChange={handleChange}
                          multiple
                          accept="image/png, image/jpg, image/jpeg"
                          required
                        />
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
                    <Form.Control type="text" id="content" {...register('content')} />
                    <span className="text-danger">{errors?.content?.message}</span>
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
