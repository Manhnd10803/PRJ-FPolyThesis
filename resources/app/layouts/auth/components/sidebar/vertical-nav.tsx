import React from 'react';

import { Accordion } from 'react-bootstrap';

import { pathName } from '@/routes/path-name';
import { SingleNavbarItem } from './single-navbar-item';

// ========== Configs =========== //

// Thêm route mới của client thì chỉ cần giống cấu trúc bên dưới

const NAVBAR_SOCIAL_CONFIGS = [
  {
    title: 'Bảng tin',
    icon: <i className="icon material-symbols-outlined">newspaper</i>,
    pathname: pathName.HOME,
  },
  {
    title: 'Hỏi & Đáp',
    icon: <i className="icon material-symbols-outlined">quiz</i>,
    pathname: pathName.QUESTS,
  },
  {
    title: 'Blog',
    icon: <i className="icon material-symbols-outlined">article</i>,
    pathname: pathName.BLOG,
  },
  {
    title: 'Nhắn tin',
    icon: <i className="icon material-symbols-outlined">message</i>,
    pathname: pathName.CHAT,
  },
  {
    title: 'Thông báo',
    icon: <i className="icon material-symbols-outlined">notifications</i>,
    pathname: pathName.NOTIFICATION,
  },
  {
    title: 'Trang cá nhân',
    icon: <i className="icon material-symbols-outlined">person</i>,
    pathname: pathName.PROFILE,
  },
  {
    title: 'Lời mời kết bạn',
    pathname: pathName.FRIEND_REQUEST,
    icon: <i className="icon material-symbols-outlined">group_add</i>,
    miniTitle: 'F1',
  },
  {
    title: 'Danh sách bạn bè',
    icon: <i className="icon material-symbols-outlined">people</i>,
    pathname: pathName.FRIEND_LIST,
  },
];

// ========== Component =========== //

export const VerticalNavbar = React.memo(() => {
  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        {/* ========= render a block of sidebar ====== */}
        <div className="mt-4 pt-2"></div>

        {NAVBAR_SOCIAL_CONFIGS.map((item, index) => {
          return <SingleNavbarItem key={index} {...item} />;
        })}
      </Accordion>
    </>
  );
});
