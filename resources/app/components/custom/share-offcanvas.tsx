import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import facebook from '../../assets/images/social-icon/facebook.png';
import twitter from '../../assets/images/social-icon/twitter.png';
import instagram from '../../assets/images/social-icon/instagram.png';
import linkedin from '../../assets/images/social-icon/linkedin.png';
export const ShareModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const shareUrl = '';
  return (
    <>
      <div className="d-flex align-items-center feather-icon mt-2 mt-md-0">
        <Link to="#" onClick={handleShow} className="d-flex align-items-center">
          <span className="material-symbols-outlined md-18">share</span>
          <span className="ms-1">
            <strong>Chia sẻ</strong>
          </span>
        </Link>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chia sẻ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="text-center mb-3">
              <a
                href="#"
                onClick={() => {
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                }}
              >
                <img src={facebook} className="img-fluid rounded mb-2" alt="facebook" width={60} height={60} />
                <h6>Facebook</h6>
              </a>
            </div>

            <div className="text-center mb-3">
              <a
                href="#"
                onClick={() => {
                  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank');
                }}
              >
                <img src={twitter} className="img-fluid rounded mb-2" alt="twitter" width={60} height={60} />
                <h6>Twitter</h6>
              </a>
            </div>

            <div className="text-center mb-3">
              <a
                href="#"
                onClick={() => {
                  window.open(`https://www.instagram.com/sharing/url/${encodeURIComponent(shareUrl)}`, '_blank');
                }}
              >
                <img src={instagram} className="img-fluid rounded mb-2" alt="instagram" width={60} height={60} />
                <h6>Instagram</h6>
              </a>
            </div>

            <div className="text-center mb-3">
              <a
                href="#"
                onClick={() => {
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                    '_blank',
                  );
                }}
              >
                <img src={linkedin} className="img-fluid rounded mb-2" alt="linkedin" width={60} height={60} />
                <h6>LinkedIn</h6>
              </a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
