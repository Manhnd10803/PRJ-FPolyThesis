import './bootstrap';

import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return (
    <div className='block relative'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
