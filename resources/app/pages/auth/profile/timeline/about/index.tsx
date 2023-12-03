import { Card } from 'react-bootstrap';

export const About = ({ aboutUser, isLoading }) => {
  const { major } = aboutUser || '';
  return (
    <>
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Giới thiệu</h4>
          </div>
        </div>
        <Card.Body>
          <ul className="list-inline p-0 m-0">
            <li className="mb-2 d-flex align-items-center">
              <span className="material-symbols-outlined md-18">person</span>
              {isLoading ? (
                <>...</>
              ) : (
                <>
                  <p className="mb-0 ms-2">{major}</p>
                </>
              )}
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};
