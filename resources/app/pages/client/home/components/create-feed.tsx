import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';

export const CreateFeed = () => {
  return (
    <>
      <div className="d-flex align-items-center">
        <div className="user-img">
          <img src={imageUrl} alt="user1" className="avatar-60 rounded-circle img-fluid" />
        </div>

        {/* ============== FORM ============== */}
        <form className="post-text ms-3 w-100 " data-bs-toggle="modal" data-bs-target="#post-modal">
          <input
            type="text"
            className="form-control rounded"
            placeholder="Write something here..."
            style={{ border: 'none' }}
          />
        </form>
      </div>
      <hr />
      <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Photo/Video
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Tag Friend
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Feeling/Activity
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Check in
          </div>
        </li>
      </ul>
      <hr />
      <div className="other-option">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="user-img me-3">
              <img src={imageUrl} alt="user1" className="avatar-60 rounded-circle img-fluid" />
            </div>
            <h6>Your Story</h6>
          </div>
          <div className="card-post-toolbar">
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} role="button">
                <span className="btn btn-primary">Friend</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className=" m-0 p-0">
                <Dropdown.Item className=" p-3" href="#">
                  <div className="d-flex align-items-top">
                    <i className="ri-save-line h4"></i>
                    <div className="data ms-2">
                      <h6>Public</h6>
                      <p className="mb-0">Anyone on or off Facebook</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="p-3" href="#">
                  <div className="d-flex align-items-top">
                    <i className="ri-close-circle-line h4"></i>
                    <div className="data ms-2">
                      <h6>Friends</h6>
                      <p className="mb-0">Your Friend on facebook</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className=" p-3" href="#">
                  <div className="d-flex align-items-top">
                    <i className="ri-user-unfollow-line h4"></i>
                    <div className="data ms-2">
                      <h6>Friends except</h6>
                      <p className="mb-0">Don't show to some friends</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className=" p-3" href="#">
                  <div className="d-flex align-items-top">
                    <i className="ri-notification-line h4"></i>
                    <div className="data ms-2">
                      <h6>Only Me</h6>
                      <p className="mb-0">Only me</p>
                    </div>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary d-block w-100 mt-3">
        Post
      </button>
    </>
  );
};
