import { Container, Col, Row, Card, Button, Nav, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ListQandAPage } from './components/list-qanda';
import { FormAskQuestionPage } from './components/form-ask-question';

export const QuestionAndAnswerPage = () => {
  const location = useLocation();
  const routeComponents = {
    '/question-and-answer': <ListQandAPage />,
    '/form-ask-question': <FormAskQuestionPage />,
  };
  const selectedComponent = routeComponents[location.pathname] || null;
  return (
    <>
      <div id="content-page" className="content-page">
        {selectedComponent}

        {/* {location.pathname === '/question-and-answer' ? (
          <ListQandAPage />
        ) : location.pathname === '/form-ask-question' ? (
          <FormAskQuestionPage />
        ) : null} */}
      </div>
    </>
  );
};
