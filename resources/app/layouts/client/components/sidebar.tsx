import { useEffect } from 'react';
import { VerticalNav } from './vertical-nav';

import Scrollbar from 'smooth-scrollbar';

export const Sidebar = () => {
  // const sidebarType = useSelector(SettingSelector.sidebar_type) // array
  //   const sidebarMenuStyle = useSelector(SettingSelector.sidebar_menu_style)
  useEffect(() => {
    Scrollbar.init(document.querySelector('.data-scrollbar'));

    window.addEventListener('resize', () => {
      const tabs = document.querySelectorAll('.nav');
      const sidebarResponsive = document.querySelector('[data-sidebar="responsive"]');
      if (window.innerWidth < 1025) {
        Array.from(tabs, elem => {
          if (
            !elem.classList.contains('flex-column') &&
            elem.classList.contains('nav-tabs') &&
            elem.classList.contains('nav-pills')
          ) {
            elem.classList.add('flex-column', 'on-resize');
          }
          return elem.classList.add('flex-column', 'on-resize');
        });
        if (sidebarResponsive !== null) {
          if (!sidebarResponsive.classList.contains('sidebar-mini')) {
            sidebarResponsive.classList.add('sidebar-mini', 'on-resize');
          }
        }
      } else {
        Array.from(tabs, elem => {
          if (elem.classList.contains('on-resize')) {
            elem.classList.remove('flex-column', 'on-resize');
          }
          return elem.classList.remove('flex-column', 'on-resize');
        });
        if (sidebarResponsive !== null) {
          if (
            sidebarResponsive.classList.contains('sidebar-mini') &&
            sidebarResponsive.classList.contains('on-resize')
          ) {
            sidebarResponsive.classList.remove('sidebar-mini', 'on-resize');
          }
        }
      }
    });
  });
  return (
    <>
      <aside
        className={`${sidebarType.join(
          ' ',
        )} ${sidebarMenuStyle} sidebar sidebar-default sidebar-base navs-rounded-all `}
        id="first-tour"
        data-toggle="main-sidebar"
        data-sidebar="responsive"
      >
        <div className="sidebar-body pt-0 data-scrollbar">
          <div className="sidebar-list">
            <VerticalNav />
          </div>
        </div>
        <div className="sidebar-footer"></div>
      </aside>
    </>
  );
};
