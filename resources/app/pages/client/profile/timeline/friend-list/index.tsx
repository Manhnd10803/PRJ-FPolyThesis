import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import user05 from '../../../../../assets/images/user/05.jpg';
import user06 from '../../../../../assets/images/user/06.jpg';
import user07 from '../../../../../assets/images/user/07.jpg';
import user08 from '../../../../../assets/images/user/08.jpg';
import user09 from '../../../../../assets/images/user/09.jpg';
import user10 from '../../../../../assets/images/user/10.jpg';

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
                <img loading="lazy" src={user05} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Anna Rexia</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user06} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Tara Zona</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user07} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Polly Tech</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user08} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Bill Emia</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user09} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Moe Fugga</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user10} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Hal Appeno </h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user07} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Zack Lee</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user06} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Terry Aki</h6>
            </li>
            <li>
              <Link to="#">
                <img loading="lazy" src={user05} alt="gallary" className="img-fluid" />
              </Link>
              <h6 className="mt-2 text-center">Greta Life</h6>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};
