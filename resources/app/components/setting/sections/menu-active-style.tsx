import { memo, Fragment } from 'react';
import { RadioBtn } from '../elements';

type MenuActiveStyleProps = {
  sidebarMenuStyle: string;
};

export const MenuActiveStyle = memo((props: MenuActiveStyleProps) => {
  return (
    <Fragment>
      <h5 className="mt-4 mb-3">Active Menu Style</h5>
      <div className="d-grid gap-3 grid-cols-2">
        <RadioBtn
          btnName="sidebar_menu_style"
          imgComponent={true}
          label="Rounded One Side"
          className="text-center"
          inputclassName="btn-check"
          labelclassName="btn btn-border btn-setting-panel d-block overflow-hidden"
          id="navs-rounded"
          defaultChecked={props.sidebarMenuStyle}
          value="navs-rounded"
        >
          Rounded One
        </RadioBtn>
        <RadioBtn
          btnName="sidebar_menu_style"
          imgComponent={true}
          label="Rounded All"
          className="text-center"
          inputclassName="btn-check"
          labelclassName="btn btn-border btn-setting-panel d-block overflow-hidden"
          id="navs-rounded-all"
          defaultChecked={props.sidebarMenuStyle}
          value="navs-rounded-all"
        >
          Rounded All
        </RadioBtn>
        <RadioBtn
          btnName="sidebar_menu_style"
          imgComponent={true}
          label="Pill One Side"
          className="text-center"
          inputclassName="btn-check"
          labelclassName="btn btn-border btn-setting-panel d-block overflow-hidden"
          id="navs-pill"
          defaultChecked={props.sidebarMenuStyle}
          value="navs-pill"
        >
          Pill One Side
        </RadioBtn>
        <RadioBtn
          btnName="sidebar_menu_style"
          imgComponent={true}
          label="Pill All"
          className="text-center"
          inputclassName="btn-check"
          labelclassName="btn btn-border btn-setting-panel d-block overflow-hidden"
          id="navs-pill-all"
          defaultChecked={props.sidebarMenuStyle}
          value="navs-pill-all"
        >
          Pill All
        </RadioBtn>
      </div>
    </Fragment>
  );
});

MenuActiveStyle.displayName = 'MenuActiveStyle';
