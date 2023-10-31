import { Card } from 'react-bootstrap';

export const About = () => {
  return (
    <>
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">About</h4>
          </div>
        </div>
        <Card.Body>
          <ul className="list-inline p-0 m-0">
            <li className="mb-2 d-flex align-items-center">
              <span className="material-symbols-outlined md-18">person</span>
              <p className="mb-0 ms-2">Web Developer</p>
            </li>
            <li className="mb-2 d-flex align-items-center">
              <span className="material-symbols-outlined md-18">gpp_good</span>
              <p className="mb-0 ms-2">Success in slowing economic activity.</p>
            </li>
            <li className="mb-2 d-flex align-items-center">
              <span className="material-symbols-outlined md-18">place</span>
              <p className="mb-0 ms-2">USA</p>
            </li>
            <li className="d-flex align-items-center">
              <span className="material-symbols-outlined md-18">favorite_border</span>
              <p className="mb-0 ms-2">Single</p>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};
