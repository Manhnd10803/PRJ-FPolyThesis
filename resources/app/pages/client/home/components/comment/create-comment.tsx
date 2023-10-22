import { Link } from 'react-router-dom';

export const CreateComment = () => {
  return (
    <form className="comment-text d-flex align-items-center mt-3">
      <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
      <div className="comment-attagement d-flex">
        <Link to="#">
          <i className="ri-link me-3"></i>
        </Link>
        <Link to="#">
          <i className="ri-user-smile-line me-3"></i>
        </Link>
        <Link to="#">
          <i className="ri-camera-line me-3"></i>
        </Link>
      </div>
    </form>
  );
};
