import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminRoutes } from './modules/admin/admin.routes';
import { ShopRouter } from './modules/shop/ShopRouter';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<ShopRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
