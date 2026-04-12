import { Outlet } from 'react-router-dom';
import { ShopHeader } from '../components/ShopHeader';

export const ShopLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            <ShopHeader />
            <main>
                <Outlet />
            </main>
        </div>
    );
};
