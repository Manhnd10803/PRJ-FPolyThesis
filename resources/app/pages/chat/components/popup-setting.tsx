import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const PopUpSetting = ({ data, show1, setShow1 }) => {
  useEffect(() => {
    ChatSidebar();
  }, []);

  const ChatSidebar = () => {
    document.getElementsByClassName('scroller')[0].classList.add('show');
  };

  const ChatSidebarClose = () => {
    document.getElementsByClassName('scroller')[0].classList.remove('show');
  };
  return (
    <div id="user-detail-popup" className={`scroller ${show1 === 'true' ? 'show' : ''}`}>
      <div className="user-profile">
        <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3">
          <i className="material-symbols-outlined md-18" onClick={() => setShow1('false')}>
            close
          </i>
        </Button>

        <div className="user text-center mb-4">
          <Link className="avatar m-0" to="">
            <img loading="lazy" src={data?.user?.avatar} alt="avatar" width={70} height={70} />
          </Link>

          <div className="user-name mt-4">
            <h4 className="text-center">{data?.user?.username}</h4>
          </div>

          <div className="user-desc">
            <p className="text-center">{data?.user?.major}</p>
          </div>
        </div>

        <hr />

        <div className="user-detail text-left mt-4 ps-4 pe-4">
          <h5 className="mt-4 mb-4">About</h5>
          <p>It is long established fact that a reader will be distracted bt the reddable.</p>
          <h5 className="mt-3 mb-3">Status</h5>
          <ul className="user-status p-0">
            <li className="mb-1">
              <i className="ri-checkbox-blank-circle-fill text-success pe-1"></i>
              <span>Online</span>
            </li>
            <li className="mb-1">
              <i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i>
              <span>Away</span>
            </li>
            <li className="mb-1">
              <i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i>
              <span>Do Not Disturb</span>
            </li>
            <li className="mb-1">
              <i className="ri-checkbox-blank-circle-fill text-light pe-1"></i>
              <span>Offline</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
