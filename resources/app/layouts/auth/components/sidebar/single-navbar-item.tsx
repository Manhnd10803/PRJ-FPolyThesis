import { useCountNotificationsNotSeen } from '@/hooks/useNotificationQuery';
import { pathName } from '@/routes/path-name';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

type SingleNavbarItemProps = {
  title: string;
  icon: React.ReactElement;
  pathname: string;
};

export const SingleNavbarItem = ({ title, icon, pathname }: SingleNavbarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === pathname;

  const countNotificationsNotSeen = useCountNotificationsNotSeen();
  const checkAmountNoti = countNotificationsNotSeen && countNotificationsNotSeen > 0;
  // return (
  //   <li className={`${location.pathname === pathname ? 'active' : ''} nav-item `}>
  //     <Link className={`${location.pathname === pathname ? 'active' : ''} nav-link `} aria-current="page" to={pathname}>
  //       <OverlayTrigger placement="right" overlay={<Tooltip>{title}</Tooltip>}>
  //         {icon}
  //       </OverlayTrigger>
  //       <span className="item-name">{title}</span>
  //     </Link>
  //   </li>
  // );
  return (
    <Nav.Item as="li" className="py-1">
      <Link className={`${isActive ? 'active' : ''} nav-link `} aria-current="page" to={pathname}>
        <OverlayTrigger placement="right" overlay={<Tooltip>{title}</Tooltip>}>
          {icon}
        </OverlayTrigger>
        <span className="item-name">{title}</span>
        {pathname === pathName.NOTIFICATION && (
          <span
            style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className={`${
              checkAmountNoti
                ? isActive
                  ? 'text-primary bg-white rounded-circle text-center'
                  : 'text-white bg-primary rounded-circle text-center'
                : ''
            }`}
          >
            {checkAmountNoti && countNotificationsNotSeen}
          </span>
        )}
      </Link>
    </Nav.Item>
  );
};
