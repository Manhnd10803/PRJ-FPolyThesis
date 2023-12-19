import { SearchService } from '@/apis/services/search.service';
import { useDebounce } from '@/hooks';
import { pathName } from '@/routes/path-name';
import { hideImages } from '@/utilities/funcJsonImage';
import { formatFullName } from '@/utilities/functions';
import { momentVi } from '@/utilities/functions/moment-locale';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import { Form, Image, Modal, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
type SearchBarProps = {};
const Overlay: React.FC<{ onClick: () => void }> = ({ children, onClick }) => {
  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the background color and opacity as needed
    zIndex: 1000,
  };

  return (
    <div style={overlayStyles} onClick={onClick}>
      {children}
    </div>
  );
};
const calculateDropdownPosition = (isOpen: any) => {
  return {
    position: 'absolute',
    top: '0',
    left: '50%',
    transition: 'transform 1s ease',
    transform: `translate(-50%, 0) scale(${isOpen ? 1 : 0})`,
    transformOrigin: 'top center',
    zIndex: 1000,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '4px',
    overflowY: 'auto',
  };
};
const truncateTextStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
};

export const SearchBar: React.FC<SearchBarProps> = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('default');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const debouncedValue = useDebounce(searchValue, 500);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isDropdownOpen) {
      const headerElements = document.getElementsByClassName('about-profile');
      // Kiểm tra xem phần tử có tồn tại không và chỉ định rõ phần tử cụ thể từ HTMLCollection
      if (headerElements.length > 0) {
        const headerElement = headerElements[0] as HTMLElement;
        headerElement.style.setProperty('z-index', '0');
        headerElement.style.setProperty('transition', 'none');
      }
    } else {
      const headerElements = document.getElementsByClassName('about-profile');
      if (headerElements.length > 0) {
        const headerElement = headerElements[0] as HTMLElement;
        headerElement.style.setProperty('z-index', '9999');
        headerElement.style.setProperty('transition', 'all 0.5s ease-in-out');
      }
    }

    return () => {
      const headerElements = document.getElementsByClassName('about-profile');
      if (headerElements.length > 0) {
        const headerElement = headerElements[0] as HTMLElement;
        headerElement.style.setProperty('z-index', '9999');
        headerElement.style.setProperty('transition', 'all 0.5s ease-in-out');
      }
    };
  }, [isDropdownOpen]);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  const handleOverlayClick = () => {
    setDropdownOpen(false);
    setData([]);
    setSearchValue('');
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      // Nếu trống, hiển thị thông báo "Không tìm thấy kết quả cho bất kỳ danh mục nào"
      setData([]);
      setLoading(false);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await SearchService.getSearchEverything(type, debouncedValue);
      setData(result.data);
      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue, type]);

  const handleFormSubmit = (event: any) => {
    const newUrl = `/search?search=${searchValue}#blog`;
    navigate(newUrl);
    event.preventDefault();
    setData([]);
    setSearchValue('');
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLinkClick = () => {
    setDropdownOpen(false);
    setSearchValue('');
    setData([]);
  };

  console.log(data);
  return (
    <>
      {isDropdownOpen && <Overlay onClick={handleOverlayClick} />}
      <div className="iq-search-bar device-search position-relative">
        <form action="#" className="searchbox" onClick={handleToggleDropdown}>
          <Link className="search-link d-none d-lg-block" to="/">
            <span className="material-symbols-outlined">search</span>
          </Link>
          <Form.Control
            type="text"
            className="text search-input form-control bg-soft-primary d-none d-lg-block"
            placeholder="Tìm kiếm trên FpolyZone"
            defaultValue={searchValue}
            disabled={isDropdownOpen}
          />
          <Link className="d-lg-none d-flex d-none d-lg-block" to="/" onClick={handleToggleDropdown}>
            <span className="material-symbols-outlined">search</span>
          </Link>
        </form>

        {isDropdownOpen && (
          <div className="custom-dropdown " style={calculateDropdownPosition(isDropdownOpen)}>
            <form action="#" className="searchbox" onSubmit={handleFormSubmit}>
              <Link as="button" className="search-link  d-lg-block" to="/">
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">search</span>
                  </>
                )}
              </Link>
              <Form.Control
                ref={inputRef}
                type="text"
                className="text search-input form-control bg-soft-primary d-lg-block"
                placeholder="Tìm kiếm trên FpolyZone"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
            </form>
            <Modal.Body className="p-0" style={{ overflowY: 'auto', maxHeight: '500px' }}>
              {data?.blog && data.blog.length > 0 ? (
                <>
                  <div className="mt-2">
                    <h4 className="px-3 py-2 bg-primary text-white">Bài viết</h4>
                    {data?.blog.map((item, index) => (
                      <Link to={`blog/${item.id}`} onClick={handleLinkClick} key={index} className="text-black">
                        <div className="suggestion-card px-3 d-flex search-hover border-bottom" key={index}>
                          <div>
                            <h4>{item.title}</h4>
                            <div className="d-flex flex-wrap-reverse gap-2">
                              <div className="text-primary">{formatFullName(item.user)}</div>{' '}
                              <span className="text-secondary">đăng vào {momentVi(item?.created_at).fromNow()}</span>
                            </div>
                            <div className="p text-black" style={truncateTextStyle}>
                              {item?.content ? parse(hideImages(JSON.parse(item?.content))) : '...'}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}

              {data?.qa && data.qa.length > 0 ? (
                <>
                  <div className="mt-2">
                    <h4 className="px-3 py-2 bg-primary text-white">Câu hỏi</h4>
                    {data?.qa.map((item, index) => (
                      <Link
                        to={`${pathName.QUESTS_DETAIL}/${item.id}`}
                        onClick={handleLinkClick}
                        key={index}
                        className="text-black"
                      >
                        <div className="suggestion-card px-3 d-flex search-hover border-bottom" key={index}>
                          <div>
                            <h4>{item.title}</h4>
                            <div className="d-flex flex-wrap-reverse gap-2">
                              <div className="text-primary">{formatFullName(item.user)}</div>{' '}
                              <span className="text-secondary">đăng vào {momentVi(item?.created_at).fromNow()}</span>
                            </div>
                            <div className="p text-black" style={truncateTextStyle}>
                              {item?.content ? parse(JSON.parse(item?.content)) : '...'}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
              {data?.post && data.post.length > 0 ? (
                <>
                  <div className="mt-2">
                    <h4 className="px-3 py-2 bg-primary text-white">Bảng tin </h4>
                    {data?.post.map((item, index) => (
                      <Link
                        to={`${pathName.POST}/${item.id}`}
                        onClick={handleLinkClick}
                        key={index}
                        className="text-black"
                      >
                        <div className="d-flex align-items-center search-hover py-2 border-bottom">
                          <div className="flex-shrink-0">
                            <Image
                              className="align-self-center img-fluid avatar-50 rounded-pill"
                              src={item.user.avatar}
                              alt=""
                              loading="lazy"
                            />
                          </div>
                          <div className="suggestion-card px-3 d-flex" key={index}>
                            <div>
                              <div className="d-flex flex-wrap-reverse gap-2">
                                <div className="text-primary">{formatFullName(item.user)}</div>{' '}
                                <span className="text-secondary">đăng vào {momentVi(item?.created_at).fromNow()}</span>
                              </div>
                              <div className="p text-black" style={truncateTextStyle}>
                                {item?.content ? item?.content : '...'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
              {data?.user && data.user.length > 0 ? (
                <>
                  <div className="mt-2">
                    <h4 className="px-3 py-2 bg-primary text-white">Tác giả</h4>

                    <div className="">
                      {data?.user.map((item, index) => (
                        <Link to={`/profile/${item.id}`} onClick={handleLinkClick} key={index} className="text-black">
                          <div className="d-flex align-items-center search-hover py-2 border-bottom">
                            <div className="flex-shrink-0">
                              <Image
                                className="align-self-center img-fluid avatar-50 rounded-pill"
                                src={item.avatar}
                                alt=""
                                loading="lazy"
                              />
                            </div>
                            <div className="d-flex flex-column ms-3">
                              <h5 className="text-black fw-bold">{formatFullName(item)}</h5>
                              <span className="text-secondary">@{item.username}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {debouncedValue.trim() &&
                !loading &&
                !(data?.blog?.length || data?.qa?.length || data?.user?.length || data?.user?.length) && (
                  <div className="mt-2">
                    <p className="text-center">Không tìm thấy dữ liệu.</p>
                  </div>
                )}
            </Modal.Body>
          </div>
        )}
      </div>
    </>
  );
};
