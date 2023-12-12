import { GetNewPostResponseType } from '@/models/post';
import { useEffect, useMemo } from 'react';
import { Col, Image, Modal, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PostDetailContextProvider } from './contexts';
import { ListImage } from './components/list-image';
import { PostDetailContent } from './components/post-detail-content';
import logo from '@/assets/images/logo.png';

type StateType = {
  data: GetNewPostResponseType;
};

export const PostDetail = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { data } = (location.state as StateType) ?? {};

  const handleClose = () => {
    navigate(-1);
  };

  const isShow = useMemo(() => {
    return !!data;
  }, [data]);

  // effect
  useEffect(() => {
    if (isShow) {
      const headerElement = document.getElementById('header-navbar');

      headerElement?.style.setProperty('display', 'none');
    }

    return () => {
      const headerElement = document.getElementById('header-navbar');

      headerElement?.style.setProperty('display', 'inline-block');
    };
  }, []);

  // render
  return (
    <PostDetailContextProvider
      value={{
        data: data,
        post: data.post,
        like_counts_by_emotion: data.like_counts_by_emotion,
        total_comments: data.total_comments,
        comments: data.comments,
        like: data.like,
      }}
    >
      <Modal centered fullscreen className="fade" animation id="post-modal" onHide={handleClose} show={isShow}>
        <Modal.Body className="relative overflow-hidden p-0">
          <div style={{ display: 'flex', gap: 10, position: 'absolute', zIndex: 10, left: 10, top: 10 }}>
            <Link to="#" className="lh-1" onClick={handleClose}>
              <span style={{ fontSize: 50 }} className="material-symbols-outlined">
                close
              </span>
            </Link>
            <Link
              to="/"
              style={{ width: 50, height: 50, boxShadow: '0px 0px 8px #000' }}
              className="bg-white rounded-circle"
            >
              <Image src={logo} width={50} className="p-1" />
            </Link>
          </div>
          <Row>
            {/* ==== render left content ==== */}
            <Col lg={8}>
              <ListImage />
            </Col>
            {/* ==== render right content ==== */}
            <Col lg={4}>
              <PostDetailContent />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </PostDetailContextProvider>
  );
};
