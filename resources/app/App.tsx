import './bootstrap';
//scss
import './assets/scss/index.scss';
import './assets/scss/customizer.scss';

function App(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}

export default App;
