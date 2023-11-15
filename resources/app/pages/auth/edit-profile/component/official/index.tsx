import { Button, Col, Form, Row } from 'react-bootstrap';
import noImage from '@/assets/images/no-image.png';
import { useEffect, useState } from 'react';
export const Official = ({ AccountShow, DataUser, update, handleChange }: any) => {
  const [image, setImage] = useState(noImage);
  useEffect(() => {
    if (DataUser.avatar) {
      if (typeof DataUser.avatar === 'string') {
        setImage(DataUser.avatar); // If it's a string (URL)
      } else if (DataUser.avatar instanceof File) {
        const imageUrl = URL.createObjectURL(DataUser.avatar);
        setImage(imageUrl);
      }
    }
  }, [DataUser.avatar]);
  const handleImageChange = (e: any) => {
    e.preventDefault();
    const selectedImage = e.target.files[0];
    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : noImage;
    setImage(imageUrl);
  };
  return (
    <>
      <div className="form-card text-left">
        <Row>
          <div className="col-12">
            <h3 className="mb-4">Avatar:</h3>
          </div>
        </Row>
        <Row>
          <div className="d-flex justify-content-center my-2">
            {image && (
              <div>
                <img src={image} alt="" className="avatar-130 rounded-circle" />
              </div>
            )}
          </div>
          <Col className="d-flex justify-content-center">
            <p>
              <Form.Control
                type="file"
                aria-label="file example"
                name="avatar"
                multiple
                {...update('avatar')}
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageChange}
              />
            </p>
          </Col>
        </Row>
      </div>
      <Button name="next" className="float-end" type="submit">
        Submit
      </Button>
      <Button
        variant="dark"
        name="previous"
        className="previous action-button-previous float-end me-3"
        value="Previous"
        onClick={() => AccountShow('Account')}
      >
        Previous
      </Button>
    </>
  );
};
