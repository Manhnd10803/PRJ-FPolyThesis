import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import noImage from '@/assets/images/no-image.png';
export const Official = ({ AccountShow }: any) => {
  const [image, setImage] = useState(noImage);
  const handleImageChange = (e: any) => {
    e.preventDefault();
    const selectedImage = e.target.files[0]; // Select the first image
    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : noImage; // Use default image if no image selected
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
                multiple
                accept="image/png, image/jpg, image/jpeg"
                onChange={handleImageChange}
                required
              />
            </p>
          </Col>
        </Row>
      </div>
      <Button name="next" className="float-end" value="Submit" onClick={() => AccountShow('Image')}>
        Next
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
