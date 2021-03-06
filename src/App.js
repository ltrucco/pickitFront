import './App.css';
import 'boxicons/css/boxicons.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import ServicesPage from './pages/servicesPage/ServicesPage';
import OwnersPage from './pages/ownersPage/OwnersPage';
import CarsPage from './pages/carsPage/CarsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout/>}>
          <Route index element={<ServicesPage/>} />
          <Route path='/servicios' element={<ServicesPage/>} />
          <Route path='/automotores' element={<CarsPage/>} />
          <Route path='/propietarios' element={<OwnersPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
