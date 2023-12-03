import { useEffect } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ListImage } from './list-image';
import { PostDetailContent } from './post-detail-content';
import { PostDetailContextProvider, usePostContext } from '../../contexts';
import { GetNewPostResponseType } from '@/models/post';

type PostDetailProps = {
  onClose: () => void;
  show: boolean;
  data: GetNewPostResponseType | null;
};

export const PostDetailModal = ({ onClose, show, data }: PostDetailProps) => {
  if (!data) return null;

  useEffect(() => {
    if (show) {
      const headerElement = document.getElementById('header-navbar');

      headerElement?.style.setProperty('display', 'none');
    }

    return () => {
      const headerElement = document.getElementById('header-navbar');

      headerElement?.style.setProperty('display', 'inline-block');
    };
  }, [show]);

  return (
    <PostDetailContextProvider
      value={{
        data: data,
        post: data.post,
        like_counts_by_emotion: data.like_counts_by_emotion,
        comments: data.comments,
      }}
    >
      <Modal centered fullscreen className="fade" animation id="post-modal" onHide={onClose} show={show}>
        <Modal.Body className="relative overflow-hidden p-0">
          <Link to="#" className="lh-1" style={{ position: 'absolute', zIndex: 10, left: 0, top: 0 }} onClick={onClose}>
            <span style={{ fontSize: 50 }} className="material-symbols-outlined">
              close
            </span>
          </Link>
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
