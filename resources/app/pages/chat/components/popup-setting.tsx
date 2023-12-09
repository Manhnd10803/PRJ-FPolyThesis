import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type PopUpSettingProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUpSetting = ({ show, setShow }: PopUpSettingProps) => {
  const userInfo = StorageFunc.getUser();

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
    <div id="user-detail-popup" className={`scroller ${show ? 'show' : ''}`}>
      <div className="user-profile">
        <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3">
          <i className="material-symbols-outlined md-18" onClick={() => setShow(false)}>
            close
          </i>
        </Button>

        <div className="user text-center mb-4">
          <Link className="avatar m-0" to="">
            <img loading="lazy" src={userInfo?.avatar} alt="avatar" width={70} height={70} />
          </Link>

          <div className="user-name mt-4">
            <h4 className="text-center">{userInfo?.username}</h4>
          </div>

          <div className="user-desc">{/* <p className="text-center">{userInfo?.major}</p> */}</div>
        </div>

        <hr />

        <div className="user-detail text-left mt-4 ps-4 pe-4">
          <h5 className="mt-4 mb-4">About</h5>
          <p>It is long established fact that a reader will be distracted bt the reddable.</p>
          <h5 className="mt-3 mb-3">Status</h5>
          <ul className="user-status p-0">
            <li className="mb-1">
              <i className="ri-checkbox-blank-circle-fill text-success pe-1"></i>
              <span>Đang hoạt động</span>
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
              <span>Ngoại tuyến</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
