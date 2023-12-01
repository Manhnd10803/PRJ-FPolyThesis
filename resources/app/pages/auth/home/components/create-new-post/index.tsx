import { useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { CreatePostModal } from './create-post-modal';

import addImageUrl from '@/assets/images/add-image.png';
import feelingUrl from '@/assets/images/feeling.png';
import tagFriendUrl from '@/assets/images/tag-friend.png';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

export const CreateNewPost = () => {
  // state
  const userInfo = StorageFunc.getUser();
  const [showModal, setShowModal] = useState(false);

  // func
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //render
  return (
    <Col sm={12}>
      <Card id="post-modal-data" className="card-block card-stretch card-height">
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Đăng trạng thái</h4>
          </div>
        </div>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="user-img">
              <img src={userInfo?.avatar} alt="user1" className="avatar-60 rounded-circle" />
            </div>
            <form className="post-text ms-3 w-100 " onClick={handleShow}>
              <input
                type="text"
                className="form-control rounded"
                placeholder="Bạn đang nghĩ gì vậy..."
                style={{ border: 'none' }}
              />
            </form>
          </div>
          <hr></hr>
          <ul className="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
            <li className="me-3 mb-md-0 mb-2">
              <div onClick={handleShow} className="btn btn-soft-primary">
                <img src={addImageUrl} alt="icon" className="img-fluid me-2" /> Ảnh/Video
              </div>
            </li>
            <li className="me-3 mb-md-0 mb-2">
              <div onClick={handleShow} className="btn btn-soft-primary">
                <img src={tagFriendUrl} alt="icon" className="img-fluid me-2" /> Tag Bạn Bè
              </div>
            </li>
            <li className="me-3">
              <div onClick={handleShow} className="btn btn-soft-primary">
                <img src={feelingUrl} alt="icon" className="img-fluid me-2" /> Cảm Xúc/Hoạt động
              </div>
            </li>
          </ul>
        </Card.Body>

        {/*============== Modal Create Post =============*/}
        <CreatePostModal show={showModal} handleClose={handleClose} />
      </Card>
    </Col>
  );
};
