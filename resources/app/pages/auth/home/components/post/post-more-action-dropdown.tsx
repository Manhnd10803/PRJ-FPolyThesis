import { Dropdown } from 'react-bootstrap';

export const MoreActionDropdown = () => {
  return (
    <div className="card-post-toolbar">
      <Dropdown>
        <Dropdown.Toggle variant="bg-transparent">
          <span className="material-symbols-outlined">more_horiz</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu m-0 p-0">
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <div className="h4 material-symbols-outlined">
                <i className="ri-save-line"></i>
              </div>
              <div className="data ms-2">
                <h6>Lưu bài viết</h6>
                <p className="mb-0">Thêm vào danh sách yêu thích của bạn </p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-close-circle-line h4"></i>
              <div className="data ms-2">
                <h6>Ẩn bài viết</h6>
                <p className="mb-0">Xem ít hơn các bài viết tương tự.</p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-user-unfollow-line h4"></i>
              <div className="data ms-2">
                <h6>Bỏ theo dõi</h6>
                <p className="mb-0">Ngừng xem bài viết nhưng vẫn là bạn bè.</p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className=" p-3" href="#">
            <div className="d-flex align-items-top">
              <i className="ri-notification-line h4"></i>
              <div className="data ms-2">
                <h6>Bật thông báo</h6>
                <p className="mb-0">Bật thông báo với bài viết này</p>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
