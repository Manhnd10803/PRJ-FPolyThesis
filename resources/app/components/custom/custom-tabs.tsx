import { Nav, Tab } from 'react-bootstrap';

type TabConfigType = {
  title: string;
  content: React.ReactNode | string;
};

type CustomTabsProps = {
  defaultActiveKey: string;
  tabsConfig: Array<TabConfigType>;
};

export const CustomTabs = ({ defaultActiveKey, tabsConfig }: CustomTabsProps) => {
  return (
    <Tab.Container defaultActiveKey={defaultActiveKey}>
      <Nav variant="tabs" fill className="mb-3" id="nav-tab" role="tablist">
        {tabsConfig.map(tab => (
          <Nav.Link
            eventKey={tab.title}
            className="d-flex justify-content-center align-items-center"
            id={`nav-${tab.title}-tab`}
            data-bs-toggle="tab"
            data-bs-target={`#nav-${tab.title}`}
            type="button"
            role="tab"
            aria-controls={`nav-${tab.title}`}
            aria-selected="true"
          >
            {tab.title}
          </Nav.Link>
        ))}
      </Nav>
      <Tab.Content>
        {tabsConfig.map(tab => (
          <Tab.Pane
            className="fade show"
            id={`nav-${tab.title}`}
            eventKey={tab.title}
            role="tabpanel"
            aria-labelledby={`nav-${tab.title}-tab`}
          >
            {tab.content}
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
};
