import { CustomToggle } from '@/components/custom';
import { Dropdown, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DropdownPrivacy } from './dropdown-privacy';

const imageUrl = 'https://picsum.photos/20';

type CreateFeedModalProps = {
  handleClose: () => void;
  show: boolean;
};

export const CreateFeedModal = ({ handleClose, show }: CreateFeedModalProps) => {
  const renderHeader = () => {
    return (
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title id="post-modalLabel" className="text-center w-100">
          Create Post
        </Modal.Title>
        <Link to="#" className="lh-1" onClick={handleClose}>
          <span className="material-symbols-outlined">close</span>
        </Link>
      </Modal.Header>
    );
  };

  //render
  return (
    <Modal centered size="md" className="fade" id="post-modal" onHide={handleClose} show={show}>
      {renderHeader()}
      <Modal.Body>
        <>
          <div className="d-flex flex-column align-items-start">
            <div className="d-flex align-items-center mb-5">
              <img src={imageUrl} alt="story-img" className="rounded-circle img-fluid avatar-60" />
              <div className="stories-data ms-3">
                <h5>Hieu Minh</h5>
                <DropdownPrivacy />
              </div>
            </div>

            {/* ============== FORM ============== */}
            <form className="post-text pb-4" data-bs-toggle="modal" data-bs-target="#post-modal">
              <input
                type="text"
                className="form-control rounded"
                placeholder="Write something here..."
                style={{ border: 'none' }}
              />
            </form>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center borderbox border rounded p-2 px-3">
            <div>Add to your post</div>

            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Photo/Video</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Tag Friend</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Feeling/Activity</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Check in</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <Link to="#"></Link>
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
            </ul>
          </div>

          <button type="submit" className="btn btn-primary d-block w-100 mt-3">
            Post
          </button>
        </>
      </Modal.Body>
    </Modal>
  );
};
