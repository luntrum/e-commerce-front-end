import { Outlet } from 'react-router-dom';
import HomePage from './pages/home';
import Header from './components/layout/header';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
