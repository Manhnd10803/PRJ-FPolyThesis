import { PostService } from '@/apis/services/post.service';
import logo from '@/assets/images/logo.png';
import { GetNewPostResponseType } from '@/models/post';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { Col, Image, Modal, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ListImage } from './components/list-image';
import { PostDetailContent } from './components/post-detail-content';
import { PostDetailContextProvider } from './contexts';
import { Loading } from '@/components/shared/loading';

type StateType = {
  data: GetNewPostResponseType;
};

export const PostDetail = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { id } = useParams();

  const { data: dataModal } = (location.state as StateType) ?? {};

  const isShowModal = useMemo(() => {
    return !!dataModal;
  }, [dataModal]);

  // Nếu không có data thì sẽ gọi api để lấy data dựa vào điều kiện isShowModal
  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data } = await PostService.getPostDetail(Number(id));
      return data;
    },
    initialData: isShowModal ? dataModal : undefined,
    // enabled: !isShowModal,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleClose = () => {
    navigate(-1);
  };

  // effect
  useEffect(() => {
    if (isShowModal) {
      const headerElement = document.getElementById('header-navbar');

      headerElement?.style.setProperty('display', 'none');
    }

    return () => {
      const headerElement = document.getElementById('header-navbar');

      headerElement?.style.setProperty('display', 'inline-block');
    };
  }, []);

  if (isLoading)
    return (
      <div className="relative overflow-hidden p-0">
        <Loading />
      </div>
    );

  if (isError) return <div>Error...</div>;

  if (!data) return null;
  // render
  return (
    <PostDetailContextProvider
      value={{
        data: data,
        post: data.post,
        like_counts_by_emotion: data.like_counts_by_emotion,
        total_comments: data.total_comments,
        comments: data.comments,
        likers: data.likers,
      }}
    >
      {isShowModal ? (
        <Modal centered fullscreen className="fade" animation id="post-modal" onHide={handleClose} show={isShowModal}>
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
      ) : (
        <div className="relative overflow-hidden p-0">
          <div style={{ display: 'flex', gap: 10, position: 'absolute', zIndex: 10, left: 10, top: 10 }}>
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
        </div>
      )}
    </PostDetailContextProvider>
  );
};
