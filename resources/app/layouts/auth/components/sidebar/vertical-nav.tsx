import React, { useState } from 'react';

import { Accordion } from 'react-bootstrap';

import { NestedNavbarItem } from './nested-navbar-item';
import { SingleNavbarItem } from './single-navbar-item';
import { StaticItemTitle } from './static-item-title';
import { pathName } from '@/routes/path-name';

const circleIcon = (
  <i className="icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
      <g>
        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
      </g>
    </svg>
  </i>
);

// ========== Configs =========== //

// Thêm route mới của client thì chỉ cần giống cấu trúc bên dưới

const NAVBAR_SOCIAL_CONFIGS = [
  {
    title: 'Newsfeed',
    icon: <i className="icon material-symbols-outlined">newspaper</i>,
    pathname: pathName.HOME,
  },
  {
    title: 'Q & A',
    icon: <i className="icon material-symbols-outlined">quiz</i>,
    pathname: pathName.QUESTS,
  },
  {
    title: 'Blog',
    icon: <i className="icon material-symbols-outlined">article</i>,
    pathname: pathName.BLOG,
  },
  {
    title: 'Chat',
    icon: <i className="icon material-symbols-outlined">message</i>,
    pathname: pathName.CHAT,
  },
  {
    title: 'Profile',
    icon: <i className="icon material-symbols-outlined">person</i>,
    pathname: pathName.PROFILE,
  },
  {
    title: 'Friends',
    icon: <i className="icon material-symbols-outlined">people</i>,
    pathname: pathName.FRIEND_LIST,
    eventKey: 'friend-menu',
    subNav: [
      {
        title: 'Friend List',
        pathname: pathName.FRIEND_LIST,
        icon: circleIcon,
        miniTitle: 'F',
      },
      {
        title: 'Friend Request',
        pathname: pathName.FRIEND_REQUEST,
        icon: circleIcon,
        miniTitle: 'F1',
      },
    ],
  },
  {
    title: 'Group',
    icon: <i className="icon material-symbols-outlined">groups</i>,
    pathname: pathName.GROUP,
  },
];

// ========== Component =========== //

export const VerticalNavbar = React.memo(() => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState('');

  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        {/* ========= render a block of sidebar ====== */}
        <StaticItemTitle title="Social" />

        {NAVBAR_SOCIAL_CONFIGS.map((item, index) => {
          if (item.subNav) {
            return (
              <NestedNavbarItem
                key={index}
                {...item}
                active={active}
                setActive={setActive}
                setActiveMenu={setActiveMenu}
              />
            );
          }

          return <SingleNavbarItem key={index} {...item} />;
        })}
      </Accordion>
    </>
  );
});
