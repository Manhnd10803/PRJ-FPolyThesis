import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';

export const FriendList = () => {
  return (
    <>
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Friends</h4>
          </div>
          <div className="card-header-toolbar d-flex align-items-center">
            <p className="m-0">
              <Link to="javacsript:void();">Add New </Link>
            </p>
          </div>
        </div>
        <Card.Body>
          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Anna Rexia</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Tara Zona</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Polly Tech</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Bill Emia</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Moe Fugga</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Hal Appeno </h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Zack Lee</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Terry Aki</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Greta Life</h6>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};
