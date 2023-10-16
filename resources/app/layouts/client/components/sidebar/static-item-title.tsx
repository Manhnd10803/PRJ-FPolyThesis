import { Link } from 'react-router-dom';

type StaticItemTitleProps = {
  title: string;
};
export const StaticItemTitle = ({ title }: StaticItemTitleProps) => {
  return (
    <li className="nav-item static-item">
      <Link className="nav-link static-item disabled" to="#" tabIndex={-1}>
        <span className="default-icon">Social</span>
        <span className="mini-icon" data-bs-toggle="tooltip" title={title} data-bs-placement="right">
          -
        </span>
      </Link>
    </li>
  );
};
