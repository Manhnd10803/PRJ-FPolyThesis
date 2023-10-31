import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactFsLightbox from 'fslightbox-react';

import g1 from '../../../../../assets/images/page-img/g1.jpg';
import g2 from '../../../../../assets/images/page-img/g2.jpg';
import g3 from '../../../../../assets/images/page-img/g3.jpg';
import g4 from '../../../../../assets/images/page-img/g4.jpg';
import g5 from '../../../../../assets/images/page-img/g5.jpg';
import g6 from '../../../../../assets/images/page-img/g6.jpg';
import g7 from '../../../../../assets/images/page-img/g7.jpg';
import g8 from '../../../../../assets/images/page-img/g8.jpg';
import g9 from '../../../../../assets/images/page-img/g9.jpg';
import img51 from '../../../../../assets/images/page-img/51.jpg';
import img52 from '../../../../../assets/images/page-img/52.jpg';
import img53 from '../../../../../assets/images/page-img/53.jpg';
import img54 from '../../../../../assets/images/page-img/54.jpg';
import img55 from '../../../../../assets/images/page-img/55.jpg';
import img56 from '../../../../../assets/images/page-img/56.jpg';
import img57 from '../../../../../assets/images/page-img/57.jpg';
import img58 from '../../../../../assets/images/page-img/58.jpg';
import img59 from '../../../../../assets/images/page-img/59.jpg';
import img60 from '../../../../../assets/images/page-img/60.jpg';
import img61 from '../../../../../assets/images/page-img/61.jpg';
import img62 from '../../../../../assets/images/page-img/62.jpg';
import img64 from '../../../../../assets/images/page-img/64.jpg';
import img65 from '../../../../../assets/images/page-img/65.jpg';
import img63 from '../../../../../assets/images/page-img/63.jpg';

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default ? ReactFsLightbox.default : ReactFsLightbox;

export const MyPhoto = () => {
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  function imageOnSlide(number: any) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }
  return (
    <>
      <FsLightbox
        toggler={imageController.toggler}
        sources={[
          g1,
          g2,
          g3,
          g4,
          g5,
          g6,
          g7,
          g8,
          g9,
          img51,
          img52,
          img53,
          img54,
          img55,
          img56,
          img57,
          img58,
          img59,
          img60,
          img61,
          img62,
          img63,
          img64,
          img65,
          img51,
          img52,
          img53,
          img54,
          img55,
          img56,
          img57,
          img58,
          img51,
          img52,
          img53,
          img54,
          img55,
          img56,
          img57,
          img58,
          img59,
          img60,
        ]}
        slide={imageController.slide}
      />
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Photos</h4>
          </div>
          <div className="card-header-toolbar d-flex align-items-center">
            <p className="m-0">
              <Link to="#">Add Photo </Link>
            </p>
          </div>
        </div>
        <Card.Body>
          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
            <li>
              <Link onClick={() => imageOnSlide(1)} to="#">
                <img loading="lazy" src={g1} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(2)} to="#">
                <img loading="lazy" src={g2} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(3)} to="#">
                <img loading="lazy" src={g3} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(4)} to="#">
                <img loading="lazy" src={g4} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(5)} to="#">
                <img loading="lazy" src={g5} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(6)} to="#">
                <img loading="lazy" src={g6} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(7)} to="#">
                <img loading="lazy" src={g7} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(8)} to="#">
                <img loading="lazy" src={g8} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(9)} to="#">
                <img loading="lazy" src={g9} alt="gallary" className="img-fluid" />
              </Link>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyPhoto;
