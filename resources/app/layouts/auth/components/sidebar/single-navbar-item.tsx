import { useCountNotificationsNotSeen } from '@/hooks/useNotificationQuery';
import { pathName } from '@/routes/path-name';
import { useMemo } from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

type SingleNavbarItemProps = {
  title: string;
  icon: React.ReactElement;
  pathname: string;
};

export const SingleNavbarItem = ({ title, icon, pathname }: SingleNavbarItemProps) => {
  const location = useLocation();

  const splitPathname = location.pathname.split('/');

  const isActive = useMemo(() => {
    return splitPathname[1] === pathname.split('/')[1];
  }, [splitPathname, pathname]);

  const countNotifyUnRead = useCountNotificationsNotSeen();

  const hasNotifyUnRead = useMemo(() => {
    return countNotifyUnRead && countNotifyUnRead > 0;
  }, [countNotifyUnRead]);

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
              hasNotifyUnRead
                ? isActive
                  ? 'text-primary bg-white rounded-circle text-center'
                  : 'text-white bg-primary rounded-circle text-center'
                : ''
            }`}
          >
            {hasNotifyUnRead ? countNotifyUnRead : ''}
          </span>
        )}
      </Link>
    </Nav.Item>
  );
};
