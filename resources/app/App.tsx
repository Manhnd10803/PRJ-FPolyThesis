//scss
import './assets/scss/index.scss';
import './assets/scss/customizer.scss';
import { useDispatch } from 'react-redux';
import { setSetting } from './redux/slice';

function App(props: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  dispatch(setSetting());

  return <>{props.children}</>;
}

export default App;
