import { useCountNotificationsNotSeen } from '@/hooks/useNotificationQuery';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

type SingleNavbarItemProps = {
  title: string;
  icon: React.ReactElement;
  pathname: string;
};

export const SingleNavbarItem = ({ title, icon, pathname }: SingleNavbarItemProps) => {
  const location = useLocation();
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
      <Link className={`${location.pathname === pathname ? 'active' : ''} nav-link `} aria-current="page" to={pathname}>
        <OverlayTrigger placement="right" overlay={<Tooltip>{title}</Tooltip>}>
          {icon}
        </OverlayTrigger>
        <span className="item-name">{title}</span>
        {title === 'Thông báo' && (
          <span
            className={`text-default ${
              checkAmountNoti ? 'text-primary border border-primary rounded-circle px-1' : ''
            }`}
          >
            {checkAmountNoti && countNotificationsNotSeen}
          </span>
        )}
      </Link>
    </Nav.Item>
  );
};
