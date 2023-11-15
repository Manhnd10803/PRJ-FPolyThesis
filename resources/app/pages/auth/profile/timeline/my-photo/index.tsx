import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactFsLightbox from 'fslightbox-react';

const imageUrl = 'https://picsum.photos/20';

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
        sources={[imageUrl, imageUrl, imageUrl]}
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
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(2)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(3)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(4)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(5)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(6)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(7)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(8)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
            <li>
              <Link onClick={() => imageOnSlide(9)} to="#">
                <img loading="lazy" src={imageUrl} alt="gallary" className="img-fluid" />
              </Link>
            </li>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyPhoto;
