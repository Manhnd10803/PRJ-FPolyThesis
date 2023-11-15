import { useState } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { CreatePostModal } from './create-post-modal';

const imageUrl = 'https://picsum.photos/20';

import addImageUrl from '@/assets/images/add-image.png';
import feelingUrl from '@/assets/images/feeling.png';
import tagFriendUrl from '@/assets/images/tag-friend.png';

export const CreateNewPost = () => {
  // state
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
            <h4 className="card-title">Create Post</h4>
          </div>
        </div>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="user-img">
              <img src={imageUrl} alt="user1" className="avatar-60 rounded-circle" />
            </div>
            <form className="post-text ms-3 w-100 " onClick={handleShow}>
              <input
                type="text"
                className="form-control rounded"
                placeholder="Write something here..."
                style={{ border: 'none' }}
              />
            </form>
          </div>
          <hr></hr>
          <ul className="post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
            <li className="me-3 mb-md-0 mb-2">
              <div onClick={handleShow} className="btn btn-soft-primary">
                <img src={addImageUrl} alt="icon" className="img-fluid me-2" /> Photo/Video
              </div>
            </li>
            <li className="me-3 mb-md-0 mb-2">
              <div onClick={handleShow} className="btn btn-soft-primary">
                <img src={tagFriendUrl} alt="icon" className="img-fluid me-2" /> Tag Friend
              </div>
            </li>
            <li className="me-3">
              <div onClick={handleShow} className="btn btn-soft-primary">
                <img src={feelingUrl} alt="icon" className="img-fluid me-2" /> Feeling/Activity
              </div>
            </li>
            <li>
              <button className=" btn btn-soft-primary">
                <div className="card-header-toolbar d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle as="div" className="lh-1">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleShow} href="#">
                        Check in
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleShow} href="#">
                        Live Video
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleShow} href="#">
                        Gif
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleShow} href="#">
                        Watch Party
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleShow} href="#">
                        Play with Friend
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </button>
            </li>
          </ul>
        </Card.Body>

        {/*============== Modal Create Post =============*/}
        <CreatePostModal show={showModal} handleClose={handleClose} />
      </Card>
    </Col>
  );
};
