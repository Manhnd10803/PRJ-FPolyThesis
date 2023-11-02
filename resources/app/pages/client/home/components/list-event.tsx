import { CustomToggle } from '@/components/custom';
import { Card, Dropdown } from 'react-bootstrap';

//image
const imageUrl = 'https://picsum.photos/20';

export const ListEvent = () => {
  return (
    <Card>
      <div className="card-header d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Events</h4>
        </div>
        <div className="card-header-toolbar d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              as={CustomToggle}
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
            >
              <i className="ri-more-fill h4"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className=" dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <Dropdown.Item href="#">
                <i className="ri-eye-fill me-2"></i>View
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="ri-delete-bin-6-fill me-2"></i>Delete
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="ri-pencil-fill me-2"></i>Edit
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="ri-printer-fill me-2"></i>Print
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="ri-file-download-fill me-2"></i>Download
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Card.Body>
        <ul className="media-story list-inline m-0 p-0">
          <li className="d-flex mb-4 align-items-center ">
            <img src={imageUrl} alt="story1" className="rounded-circle img-fluid" />
            <div className="stories-data ms-3">
              <h5>Web Workshop</h5>
              <p className="mb-0">1 hour ago</p>
            </div>
          </li>
          <li className="d-flex align-items-center">
            <img src={imageUrl} alt="story2" className="rounded-circle img-fluid" />
            <div className="stories-data ms-3">
              <h5>Fun Events and Festivals</h5>
              <p className="mb-0">1 hour ago</p>
            </div>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};
