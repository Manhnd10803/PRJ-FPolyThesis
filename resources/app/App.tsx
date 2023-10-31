import './bootstrap';
//scss
import './assets/scss/index.scss';
import './assets/scss/customizer.scss';
import { useDispatch } from 'react-redux';
import { setSetting } from './redux/slice';
import { ErrorBoundary } from './ErrorBoundary';

function App(props: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  dispatch(setSetting());

  return <ErrorBoundary>{props.children}</ErrorBoundary>;
}

export default App;
