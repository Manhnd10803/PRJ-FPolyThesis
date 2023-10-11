import React from 'react';
import { Link } from 'react-router-dom';

type CustomToggleProps = {
  children: React.ReactNode;
  variant: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const CustomToggle = React.forwardRef(
  ({ children, variant, onClick }: CustomToggleProps, ref: React.Ref<HTMLAnchorElement>) => (
    <Link
      to="/"
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      className={variant}
    >
      {children}
    </Link>
  ),
);
