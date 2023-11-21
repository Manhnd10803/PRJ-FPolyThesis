import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactFsLightbox from 'fslightbox-react';

const imageUrl = 'https://picsum.photos/20';

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default ? ReactFsLightbox.default : ReactFsLightbox;

export const MyPhoto = ({ listPhoto }) => {
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
              <Link to="#">More </Link>
            </p>
          </div>
        </div>
        <Card.Body>
          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
            <>
              {listPhoto &&
                listPhoto.map((item, index) => (
                  <li key={index} className="img-effect">
                    <img width={80} height={80} src={item} alt="profile" onClick={() => imageOnSlide(index + 1)} />
                  </li>
                ))}
            </>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyPhoto;
