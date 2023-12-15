import { Skeleton } from '@mui/material';
import { Card } from 'react-bootstrap';

export const About = ({ aboutUser, isLoading }) => {
  const { major, bio, birthday } = aboutUser || '';
  return (
    <>
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Giới thiệu</h4>
          </div>
        </div>
        <Card.Body>
          {isLoading ? (
            <>
              <ul className="list-inline p-0 m-0">
                <>
                  <Skeleton className="skeleton-color" height={20} width="100%" />
                  <Skeleton className="skeleton-color" height={20} width="100%" />
                </>
              </ul>
            </>
          ) : (
            <ul className="list-inline p-0 m-0">
              <>
                {bio && <li className="mb-2 fw-bold">{bio}</li>}
                <li className="mb-2 d-flex align-items-center">
                  <span className="material-symbols-outlined md-18">person</span>
                  <span className="mb-0 d-flex align-items-center ms-2">{major}</span>
                </li>
                {birthday && (
                  <li className="mb-2 d-flex align-items-center">
                    <span className="material-symbols-outlined md-18">cake</span>
                    <p className="mb-0 ms-2">{birthday}</p>
                  </li>
                )}
              </>
            </ul>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
