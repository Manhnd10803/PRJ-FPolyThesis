import { SearchService } from '@/apis/services/search.service';
import { useDebounce } from '@/hooks';
import { formatDateFromCreatedAt } from '@/pages/auth/blog/components/format-date';
import { formatFullName } from '@/utilities/functions';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Form, Image, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('default');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const debouncedValue = useDebounce(searchValue, 500);
  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOverlayClick = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchValue('');
      return;
    }
    const fetchApi = async () => {
      setLoading(true);
      const result = await SearchService.getSearchEverything(type, debouncedValue);
      console.log(result);
      setData(result.data);
      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);

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
            placeholder="Search here..."
          />
          <Link className="d-lg-none d-flex d-none d-lg-block" to="/" onClick={handleToggleDropdown}>
            <span className="material-symbols-outlined">search</span>
          </Link>
        </form>

        {isDropdownOpen && (
          <div className="custom-dropdown " style={calculateDropdownPosition(isDropdownOpen)}>
            <form action="#" className="searchbox">
              <Link className="search-link  d-lg-block" to="/">
                <span className="material-symbols-outlined">search</span>
              </Link>
              <Form.Control
                type="text"
                className="text search-input form-control bg-soft-primary d-lg-block"
                placeholder="Search here..."
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
                      <div className="suggestion-card px-3 d-flex search-hover" key={index}>
                        <div>
                          <h4>{item.title}</h4>
                          <div className="d-flex flex-wrap-reverse gap-2">
                            <div>{formatFullName(item.user)}</div>{' '}
                            <span>{formatDateFromCreatedAt(item?.created_at)}</span>
                          </div>
                          <div className="p" style={truncateTextStyle}>
                            {' '}
                            {item?.content ? parse(JSON.parse(item?.content)) : 'Content not available'}
                          </div>
                        </div>
                      </div>
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
                      <div className="suggestion-card px-3 d-flex search-hover" key={index}>
                        <div>
                          <h4>{item.title}</h4>
                          <div className="d-flex flex-wrap-reverse gap-2">
                            <div>{formatFullName(item.user)}</div>{' '}
                            <span>{formatDateFromCreatedAt(item?.created_at)}</span>
                          </div>
                          <div className="p" style={truncateTextStyle}>
                            {' '}
                            {item?.content ? parse(JSON.parse(item?.content)) : 'Content not available'}
                          </div>
                        </div>
                      </div>
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
                            <Link to="/" className="h5">
                              {formatFullName(item)}
                            </Link>

                            <span>@{item.username}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Modal.Body>
          </div>
        )}
      </div>
    </>
  );
};
