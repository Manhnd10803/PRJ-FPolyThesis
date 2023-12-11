import { AuthService } from '@/apis/services/auth.service';
import { CustomToggle } from '@/components/custom';
import { IUser } from '@/models/user';
import { authActions } from '@/redux/slice';
import { pathName } from '@/routes/path-name';
import { formatFullName } from '@/utilities/functions';
import { clear } from '@/utilities/local-storage';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Card, Dropdown, Image } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const UserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = StorageFunc.getUser();

  const { isLoading, mutate } = useMutation({
    mutationFn: AuthService.Logout,
    onSuccess: () => {
      toast.success('Đăng xuất thành công');
      dispatch(authActions.clear());
      clear();
      navigate(pathName.LOGIN);
    },
    onError: error => {
      toast.success('Đăng xuất thất bại');
      console.log(error);
    },
  });
  // func
  const handleLogout = () => {
    if (isLoading) return;
    queueMicrotask(() => {
      mutate();
    });
  };

  const listMenu = useMemo(() => {
    return [
      {
        icon: 'account_circle',
        title: 'Trang cá nhân',
        link: pathName.PROFILE,
      },
      {
        icon: 'edit_note',
        title: 'Chỉnh sửa trang cá nhân',
        link: pathName.EDIT_PROFILE,
      },
      {
        icon: 'manage_accounts',
        title: 'Cài đặt tài khoản',
        link: pathName.ACCOUNT_SETTING,
      },
      {
        icon: 'history',
        title: 'Lịch sử hoạt động',
        link: pathName.ACCOUNT_HISTORY,
      },
      {
        icon: 'lock',
        title: 'Điều khoản và bảo mật',
        link: pathName.PRIVACY_SECURITY,
      },
      {
        icon: 'login',
        title: 'Đăng xuất',
        // Muốn dùng sự kiện thì link phải là #
        link: '#',
        onClick: handleLogout,
      },
    ];
  }, []);

  const listActivity = useMemo(() => {
    return [
      {
        icon: 'circle',
        title: 'Đang hoạt động',
        classColor: 'text-success',
      },
      {
        icon: 'circle',
        title: 'Đang bận',
        classColor: 'text-warning',
      },
      {
        icon: 'circle',
        title: 'Ngoại tuyến',
        classColor: 'text-danger',
      },
      {
        icon: 'circle',
        title: 'Ẩn',
        classColor: 'text-gray',
      },
    ];
  }, []);

  const handleChangeActivity = (item: (typeof listActivity)[0]) => {
    console.log('change activity', item);
  };

  //render
  return (
    <Dropdown as="li" className="nav-item user-dropdown">
      <Dropdown.Toggle href="#" as={CustomToggle} variant="d-flex align-items-center">
        <Image src={userInfo?.avatar} className="img-fluid rounded-circle me-3" alt="user" loading="lazy" />
        <div className="caption d-none d-lg-block">
          <h6 className="mb-0 line-height">{formatFullName(userInfo as IUser)}</h6>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="sub-drop caption-menu">
        <Card className="shadow-none m-0">
          <Card.Header>
            <div className="header-title">
              <h5 className="mb-0 ">Chào 👋 - {formatFullName(userInfo as IUser)}</h5>
            </div>
          </Card.Header>

          <Card.Body className="p-0 ">
            {listMenu.map(item => {
              return (
                <Link
                  to={item.link}
                  key={item.title}
                  className="mb-0 h6 d-block"
                  onClick={isLoading ? () => null : item?.onClick}
                >
                  <div className="d-flex align-items-center iq-sub-card border-0">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <div className="ms-3">{item.title}</div>
                  </div>
                </Link>
              );
            })}
            <div className=" iq-sub-card">
              <h5>Cài đặt trạng thái</h5>
            </div>

            {listActivity.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex align-items-center iq-sub-card border-0"
                  onClick={() => handleChangeActivity(item)}
                >
                  <i className={`material-symbols-outlined ${item.classColor} md-14`}>{item.icon}</i>
                  <div className="ms-3">{item.title}</div>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};
