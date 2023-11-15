import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const HomeItem = () => {
  return (
    <Nav.Item as="li">
      <Link to="/" className="d-flex align-items-center">
        <i className="material-symbols-outlined">home</i>
        <span className="mobile-text d-none ms-3">Home</span>
      </Link>
    </Nav.Item>
  );
};
