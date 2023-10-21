import { CustomToggle } from '@/components/custom';
import { Row, Col, Container, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditableTextArea from './form-textarea';

const imageUrl = 'https://picsum.photos/20';

export const CreateAsk = () => {
  return (
    <>
      <div className="d-flex align-items-center">
        {/* ============== FORM ============== */}
        <form className="post-text ms-3 w-100 " data-bs-toggle="modal" data-bs-target="#post-modal">
          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Title
            </Form.Label>
            <Col sm="12">
              <Form.Control type="text" name="title" id="title" placeholder="Write your question titles..." />
            </Col>
          </Row>

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="exampleFormControlSelect1">
              Majors
            </Form.Label>
            <Col sm={12}>
              <select className="form-select" id="exampleFormControlSelect1">
                <option>What is your majors ?</option>
                <option>Website Design</option>
                <option>Software Application</option>
                <option>Software Development</option>
                <option>Mobile Programming</option>
                <option>Game Programming</option>
                <option>Data Rocessing</option>
              </select>
            </Col>
          </Row>

          {/* <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Content
            </Form.Label>
            <Col sm="12">
              <Form.Control
                as="textarea"
                className="textarea"
                name="content"
                rows={5}
                placeholder="Let us know the problem you are having..."
              />
            </Col>
          </Row> */}

          <EditableTextArea />

          <Row className="form-group">
            <Form.Label column sm="2" htmlFor="to" className="col-form-label">
              Tags
            </Form.Label>
            <Col sm="12">
              <Form.Control
                type="text"
                id="to"
                name="hashtag"
                placeholder="Add up to 5 tags to describe what your question is about. Start typing to see suggestions..."
              />
            </Col>
          </Row>
          <hr />
          <div className="other-option">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="user-img me-3">
                  <img src={imageUrl} alt="user1" className="avatar-60 rounded-circle img-fluid" />
                </div>
                <h6>Your Name</h6>
              </div>
              <div className="card-post-toolbar">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} role="button">
                    <span className="btn btn-primary">Public</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className=" m-0 p-0">
                    <Dropdown.Item className=" p-3" href="#">
                      <div className="d-flex align-items-top">
                        <i className="ri-save-line h4"></i>
                        <div className="data ms-2">
                          <h6>Public</h6>
                          <p className="mb-0">Everyone will know you.</p>
                        </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="p-3" href="#">
                      <div className="d-flex align-items-top">
                        <i className="ri-close-circle-line h4"></i>
                        <div className="data ms-2">
                          <h6>Anonymous Question</h6>
                          <p className="mb-0">Everyone will not know you.</p>
                        </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary d-block w-100 mt-3">
            Post Questions
          </button>
        </form>
      </div>
      {/* <hr /> */}
      <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
        {/* <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Photo
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> What is your major ?
          </div>
        </li> */}

        {/* <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Feeling/Activity
          </div>
        </li>
        <li className="col-md-6 mb-3">
          <div className="bg-soft-primary rounded p-2 pointer me-3">
            <Link to="#"></Link>
            <img src={imageUrl} alt="icon" className="img-fluid" /> Check in
          </div>
        </li> */}
      </ul>
      {/* <hr />
      <div className="other-option">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="user-img me-3">
              <img src={imageUrl} alt="user1" className="avatar-60 rounded-circle img-fluid" />
            </div>
            <h6>Your Name</h6>
          </div>
          <div className="card-post-toolbar">
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} role="button">
                <span className="btn btn-primary">Public</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className=" m-0 p-0">
                <Dropdown.Item className=" p-3" href="#">
                  <div className="d-flex align-items-top">
                    <i className="ri-save-line h4"></i>
                    <div className="data ms-2">
                      <h6>Public</h6>
                      <p className="mb-0">Everyone will know you.</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item className="p-3" href="#">
                  <div className="d-flex align-items-top">
                    <i className="ri-close-circle-line h4"></i>
                    <div className="data ms-2">
                      <h6>Anonymous Question</h6>
                      <p className="mb-0">Everyone will not know you.</p>
                    </div>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary d-block w-100 mt-3">
        Post Questions
      </button> */}
    </>
  );
};
