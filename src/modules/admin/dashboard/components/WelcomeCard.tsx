import { mockUser } from '../mocks/user.mock';
import { Clock } from 'lucide-react';

export const WelcomeCard = () => {
  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">¡Bienvenido de nuevo, {mockUser.name.split(' ')[0]}! 👋</h2>
          <p className="text-blue-100 opacity-90">Aquí tienes el resumen de tu tienda hoy.</p>
          <div className="flex items-center mt-4 text-sm bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
            <Clock size={16} className="mr-2" />
            {today}
          </div>
        </div>
        <div className="hidden md:block">
           {/* Decorative circle or illustration placeholder */}
           <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
             💼
           </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
    </div>
  );
};
