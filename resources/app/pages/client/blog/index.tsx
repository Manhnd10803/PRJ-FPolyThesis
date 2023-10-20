import { Container, Row, Col, Image, Card } from 'react-bootstrap';

import { CardItem } from './components/card-item';
import { Link } from 'react-router-dom';

// Tạo một mảng chứa thông tin về bài viết
const blogData = [
  {
    id: 1,
    title: 'Containing coronavirus spread comes',
    description:
      'In the blogpost, the IMF experts observed, "Success in containing the virus comes at the price of slowing economic activity."',
    date: '4 Month ago',
    image:
      'https://images.unsplash.com/photo-1697441642505-0f4ce8fbe98a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWltZmVlZHw3fHx8ZW58MHx8fHx8', // Thêm tên ảnh của bài viết
  },
  {
    id: 2,
    title: 'Another blog title',
    description: 'Description of the second blog post.',
    date: '2 Month ago',
    image:
      'https://images.unsplash.com/photo-1697441642505-0f4ce8fbe98a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWltZmVlZHw3fHx8ZW58MHx8fHx8', // Thêm tên ảnh của bài viết
  },
  {
    id: 3,
    title: 'Another blog title',
    description: 'Description of the second blog post.',
    date: '2 Month ago',
    image:
      'https://images.unsplash.com/photo-1697441642505-0f4ce8fbe98a?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWltZmVlZHw3fHx8ZW58MHx8fHx8', // Thêm tên ảnh của bài viết
  },
  // Thêm các bài viết khác vào đây
];

export const BlogPage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Col sm={12}>
            <div
              className="bg-primary d-flex justify-content-between align-items-center px-3 mb-3 rounded-2"
              style={{ height: '150px' }}
            >
              <div className="">
                <h3 className="text-white">Blog</h3>
                <p className="text-white">Welcome to Blog</p>
              </div>
              <Link to="#" className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block">
                <i className="material-symbols-outlined me-1">lightbulb</i>Create Blog
              </Link>
            </div>
          </Col>
          <CardItem data={blogData} />
        </Container>
      </div>
    </>
  );
};
