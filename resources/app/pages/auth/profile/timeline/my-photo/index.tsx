import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactFsLightbox from 'fslightbox-react';

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default ? ReactFsLightbox.default : ReactFsLightbox;

type typeProps = {
  listPhoto: Array<string>;
};

export const MyPhoto = ({ listPhoto }: typeProps) => {
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
        sources={listPhoto}
        slide={imageController.slide}
        disableLocalStorage={true}
      />
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Ảnh</h4>
          </div>
        </div>
        <Card.Body>
          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
            <>
              {listPhoto &&
                listPhoto.map((item, index) => {
                  if (index < 9) {
                    return (
                      <li key={index} className="img-effect">
                        <img width={80} height={80} src={item} alt="profile" onClick={() => imageOnSlide(index + 1)} />
                      </li>
                    );
                  }
                })}
            </>
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};

export default MyPhoto;
