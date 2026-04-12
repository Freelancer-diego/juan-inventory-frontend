import { Routes, Route } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { ShopLayout } from './layouts/ShopLayout';

export const ShopRouter = () => {
    return (
        <Routes>
            <Route element={<ShopLayout />}>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
        </Routes>
    );
};
