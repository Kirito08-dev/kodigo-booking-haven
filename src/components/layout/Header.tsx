import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/auth';
import { useState, useEffect } from 'react';
import { Hotel, User, LogOut } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-gradient-hero border-b border-gold/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Hotel className="h-8 w-8 text-gold transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold text-pearl">Grand Hotel Kodigo</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-pearl/80 hover:text-gold transition-colors duration-300"
            >
              Inicio
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-pearl/80 hover:text-gold transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-pearl">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                  className="text-pearl hover:text-gold hover:bg-gold/10 transition-all duration-300"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-gold text-charcoal hover:opacity-90 transition-all duration-300 shadow-luxury"
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};