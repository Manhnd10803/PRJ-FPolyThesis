import { useContext } from 'react';
import { AccordionContext, useAccordionButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type CustomToggleProps = {
  children: React.ReactNode;
  eventKey: string;
  onClick: (eventKey: { state: boolean; eventKey: string }) => void;
};

export const CustomToggle = ({ children, eventKey, onClick }: CustomToggleProps) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, active => onClick({ state: !active, eventKey: eventKey }));

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? 'true' : 'false'}
      className="nav-link"
      role="button"
      onClick={e => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
};
